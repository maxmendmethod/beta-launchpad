const STORE_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const STOREFRONT_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const ENDPOINT = `https://${STORE_DOMAIN}/api/2025-01/graphql.json`;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": STOREFRONT_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data as T;
}

export interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    price: { amount: string; currencyCode: string };
    product: { title: string };
  };
  sellingPlanAllocation?: {
    sellingPlan: { name: string };
  };
  cost: {
    totalAmount: { amount: string; currencyCode: string };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: CartLine[];
  cost: {
    subtotalAmount: { amount: string; currencyCode: string };
    totalAmount: { amount: string; currencyCode: string };
  };
}

const CART_FIELDS = `
  id
  checkoutUrl
  lines(first: 100) {
    edges {
      node {
        id
        quantity
        merchandise {
          ... on ProductVariant {
            id
            title
            price { amount currencyCode }
            product { title }
          }
        }
        sellingPlanAllocation {
          sellingPlan { name }
        }
        cost {
          totalAmount { amount currencyCode }
        }
      }
    }
  }
  cost {
    subtotalAmount { amount currencyCode }
    totalAmount { amount currencyCode }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseCart(raw: any): Cart {
  return { ...raw, lines: raw.lines.edges.map((e: any) => e.node) };
}

export async function getProductFirstVariant(productGid: string): Promise<string> {
  const data = await shopifyFetch<any>(`
    query { product(id: "${productGid}") { variants(first: 1) { edges { node { id } } } } }
  `);
  return data.product.variants.edges[0].node.id;
}

type CartLineInput = { merchandiseId: string; quantity: number; sellingPlanId?: string };

export async function createCart(lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<any>(
    `mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) { cart { ${CART_FIELDS} } userErrors { field message } }
    }`,
    { input: { lines } }
  );
  if (data.cartCreate.userErrors.length) throw new Error(data.cartCreate.userErrors[0].message);
  return parseCart(data.cartCreate.cart);
}

export async function addCartLines(cartId: string, lines: CartLineInput[]): Promise<Cart> {
  const data = await shopifyFetch<any>(
    `mutation cartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
      cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { field message } }
    }`,
    { cartId, lines }
  );
  if (data.cartLinesAdd.userErrors.length) throw new Error(data.cartLinesAdd.userErrors[0].message);
  return parseCart(data.cartLinesAdd.cart);
}

export async function updateCartLine(cartId: string, lineId: string, quantity: number): Promise<Cart> {
  const data = await shopifyFetch<any>(
    `mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } }
    }`,
    { cartId, lines: [{ id: lineId, quantity }] }
  );
  return parseCart(data.cartLinesUpdate.cart);
}

export async function removeCartLine(cartId: string, lineId: string): Promise<Cart> {
  const data = await shopifyFetch<any>(
    `mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
      cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } }
    }`,
    { cartId, lineIds: [lineId] }
  );
  return parseCart(data.cartLinesRemove.cart);
}

export async function fetchCart(cartId: string): Promise<Cart | null> {
  try {
    const data = await shopifyFetch<any>(
      `query { cart(id: "${cartId}") { ${CART_FIELDS} } }`
    );
    if (!data.cart) return null;
    return parseCart(data.cart);
  } catch {
    return null;
  }
}
