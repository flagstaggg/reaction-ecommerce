/**
 * Todas as URLs de imagem do site ficam neste arquivo.
 *
 * As fotos vêm do Unsplash (images.unsplash.com) e são carregadas com
 * parâmetros de tamanho e qualidade para manter a página leve.
 * Para trocar o catálogo inteiro, basta substituir os IDs abaixo por
 * URLs próprias mantendo o formato `unsplash(id, largura, qualidade)`,
 * ou usar `absolute()` com uma URL completa.
 */

/** Monta uma URL do Unsplash com recorte, largura e qualidade. */
export function unsplash(id: string, width = 900, quality = 80): string {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`
}

/** Usa uma URL completa (fotos próprias, CDN, etc.). */
export function absolute(url: string): string {
  return url
}

/** Atalho para fotos de produto (grade 4:5). */
const u = (id: string) => unsplash(id, 900, 80)

/* ------------------------------------------------------------------ */
/* Home — hero                                                          */
/* ------------------------------------------------------------------ */

export interface HeroSlideImage {
  src: string
  alt: string
  /** Recorte do objeto-posição no mobile, ex.: `60% 30%`. */
  positionMobile: string
  /** Recorte do objeto-posição no desktop. */
  positionDesktop: string
}

export const heroImages: HeroSlideImage[] = [
  {
    src: unsplash('photo-1490481651871-ab68de25d43d', 2000, 78),
    alt: 'Modelo usando camiseta Reaction da nova coleção verão',
    positionMobile: '62% 30%',
    positionDesktop: '50% 32%',
  },
  {
    src: unsplash('photo-1521572163474-6864f9cf17ab', 2000, 78),
    alt: 'Camisetas essenciais Reaction penduradas em araras',
    positionMobile: '46% 40%',
    positionDesktop: '50% 45%',
  },
  {
    src: unsplash('photo-1515886657613-9f3515b0c78f', 2000, 78),
    alt: 'Editorial da linha Tech Reaction em ambiente urbano',
    positionMobile: '64% 24%',
    positionDesktop: '50% 30%',
  },
]

/* ------------------------------------------------------------------ */
/* Home — banners 50/50                                                 */
/* ------------------------------------------------------------------ */

export const splitBannerImages: { src: string; alt: string; position: string }[] = [
  {
    src: unsplash('photo-1523381210434-271e8be1f52b', 1200, 80),
    alt: 'Arara com peças da Linha Urban Reaction',
    position: 'object-[50%_45%]',
  },
  {
    src: unsplash('photo-1571019613454-1cb2f99b2d8b', 1200, 80),
    alt: 'Atleta usando a Linha Tech Reaction',
    position: 'object-[50%_35%]',
  },
]

/* ------------------------------------------------------------------ */
/* Home — trio de categorias                                            */
/* ------------------------------------------------------------------ */

export const categoryTrioImages: { src: string; alt: string; position: string }[] = [
  {
    src: unsplash('photo-1521572163474-6864f9cf17ab', 900, 80),
    alt: 'Camisetas Reaction em fundo neutro',
    position: 'object-[50%_40%]',
  },
  {
    src: unsplash('photo-1556821840-3a63f95609a7', 900, 80),
    alt: 'Moletons Reaction em fundo neutro',
    position: 'object-[50%_45%]',
  },
  {
    src: unsplash('photo-1542272604-787c3835535d', 900, 80),
    alt: 'Calças Reaction em fundo neutro',
    position: 'object-[50%_40%]',
  },
]

/* ------------------------------------------------------------------ */
/* Home — "Ícones Reaction"                                             */
/* ------------------------------------------------------------------ */

export const iconsSectionImages: { src: string; alt: string }[] = [
  { src: u('photo-1503341504253-dff4815485f1'), alt: 'Camiseta Essential Reaction' },
  { src: u('photo-1620799140408-edc6dcb6d633'), alt: 'Moletom Heritage Reaction' },
  { src: u('photo-1591047139829-d91aecb6caea'), alt: 'Jaqueta Windbreaker Reaction' },
  { src: u('photo-1591195853828-11db59a44f6b'), alt: 'Calça Cargo Urban Reaction' },
]

/* ------------------------------------------------------------------ */
/* Home — "Compre por Estilo"                                           */
/* ------------------------------------------------------------------ */

export const styleCardImages: { src: string; alt: string }[] = [
  { src: u('photo-1483985988355-763728e1935b'), alt: 'Look casual Reaction' },
  { src: u('photo-1517649763962-0c623066013b'), alt: 'Roupa esportiva Reaction' },
  { src: u('photo-1483118714900-540cf339fd46'), alt: 'Look street Reaction' },
]

/* ------------------------------------------------------------------ */
/* Produtos — duas fotos por item (hover troca para a segunda)          */
/* ------------------------------------------------------------------ */

export const productImages: Record<string, string[]> = {
  /* --- Camisetas masculino --- */
  'camiseta-reaction-essential-masculina': [
    u('photo-1521572163474-6864f9cf17ab'),
    u('photo-1503341504253-dff4815485f1'),
  ],
  'camiseta-reaction-oversized-urbana': [
    u('photo-1576566588028-4147f3842f27'),
    u('photo-1618354691373-d851c5c3a990'),
  ],
  'camiseta-reaction-tech-running': [
    u('photo-1552374196-c4e7ffc6e126'),
    u('photo-1618354691373-d851c5c3a990'),
  ],
  'camiseta-reaction-graphic-heritage': [
    u('photo-1618354691373-d851c5c3a990'),
    u('photo-1507003211169-0a1dd7228f2d'),
  ],
  'camiseta-reaction-slim-premium': [
    u('photo-1434389677669-e08b4cac3105'),
    u('photo-1519085360753-af0119f7cbe7'),
  ],
  'camiseta-reaction-oversized-unissex': [
    u('photo-1483118714900-540cf339fd46'),
    u('photo-1576566588028-4147f3842f27'),
  ],

  /* --- Camisetas feminino --- */
  'camiseta-reaction-essential-feminina': [
    u('photo-1523381210434-271e8be1f52b'),
    u('photo-1531746020798-e6953c6e8e04'),
  ],
  'camiseta-reaction-cropped-urbana': [
    u('photo-1485462537746-965f33f7f6a7'),
    u('photo-1534528741775-53994a69daeb'),
  ],
  'camiseta-reaction-oversized-feminina': [
    u('photo-1496747611176-843222e1e57c'),
    u('photo-1487222477894-8943e31ef7b2'),
  ],
  'camiseta-reaction-dry-fit-feminina': [
    u('photo-1529139574466-a303027c1d8b'),
    u('photo-1483118714900-540cf339fd46'),
  ],
  'camiseta-reaction-graphic-heritage-feminina': [
    u('photo-1496747611176-843222e1e57c'),
    u('photo-1533659828870-95ee305cee3e'),
  ],

  /* --- Camisetas infantil --- */
  'camiseta-reaction-kids-essencial': [u('photo-1519238263530-99bdd11df2ea'), u('photo-1596870230751-ebdfce98ec42')],
  'camiseta-reaction-kids-urbana': [u('photo-1503454537195-1dcabb73ffb9'), u('photo-1519457431-44ccd64a579b')],

  /* --- Moletons --- */
  'moletom-heritage-masculino': [u('photo-1620799140408-edc6dcb6d633'), u('photo-1556821840-3a63f95609a7')],
  'moletom-reaction-zip-fleece': [u('photo-1556821840-3a63f95609a7'), u('photo-1620799140408-edc6dcb6d633')],
  'moletom-reaction-oversized-tech': [u('photo-1434389677669-e08b4cac3105'), u('photo-1517649763962-0c623066013b')],
  'moletom-heritage-feminino': [u('photo-1531746020798-e6953c6e8e04'), u('photo-1485462537746-965f33f7f6a7')],
  'moletom-reaction-cropped-feminino': [u('photo-1573496359142-b8d87734a5a2'), u('photo-1490481651871-ab68de25d43d')],
  'moletom-reaction-fleece-feminino': [u('photo-1533659828870-95ee305cee3e'), u('photo-1483118714900-540cf339fd46')],
  'moletom-reaction-kids-heritage': [u('photo-1596870230751-ebdfce98ec42'), u('photo-1519238263530-99bdd11df2ea')],

  /* --- Calças --- */
  'calca-cargo-urban-masculina': [u('photo-1542272604-787c3835535d'), u('photo-1591195853828-11db59a44f6b')],
  'calca-reaction-jogger-masculina': [u('photo-1591195853828-11db59a44f6b'), u('photo-1542272604-787c3835535d')],
  'calca-reaction-tech-masculina': [u('photo-1541099649105-f69ad21f3246'), u('photo-1434389677669-e08b4cac3105')],
  'calca-reaction-alfaiataria-feminina': [u('photo-1541099649105-f69ad21f3246'), u('photo-1533659828870-95ee305cee3e')],
  'calca-reaction-jeans-urban-feminina': [u('photo-1584370848010-d7fe6bc767ec'), u('photo-1542272604-787c3835535d')],
  'calca-reaction-jogger-kids': [u('photo-1596870230751-ebdfce98ec42'), u('photo-1503454537195-1dcabb73ffb9')],

  /* --- Shorts --- */
  'short-reaction-tactel-5-polares-masculino': [
    u('photo-1552196563-55cd4e45efb3'),
    u('photo-1594633312681-425c7b97ccd1'),
  ],
  'short-reaction-run-feminino': [u('photo-1518611012118-696072aa579a'), u('photo-1552196563-55cd4e45efb3')],
  'short-reaction-urbano-kids': [u('photo-1519457431-44ccd64a579b'), u('photo-1596870230751-ebdfce98ec42')],

  /* --- Jaquetas --- */
  'jaqueta-windbreaker-unissex': [u('photo-1591047139829-d91aecb6caea'), u('photo-1544441893-675973e31985')],
  'jaqueta-reaction-softshell-masculina': [u('photo-1551028719-00167b16eac5'), u('photo-1519085360753-af0119f7cbe7')],
  'jaqueta-reaction-corta-vento-feminina': [
    u('photo-1544441893-675973e31985'),
    u('photo-1485462537746-965f33f7f6a7'),
  ],
  'jaqueta-reaction-puffer-kids': [u('photo-1519238263530-99bdd11df2ea'), u('photo-1503454537195-1dcabb73ffb9')],

  /* --- Tênis --- */
  'tenis-reaction-urban-unissex': [u('photo-1542291026-7eec264c27ff'), u('photo-1600185365483-26d7a4cc7519')],
  'tenis-reaction-run-feminino': [u('photo-1595950653106-6c9ebd614d3a'), u('photo-1560769629-975ec94e6a86')],
  'tenis-reaction-classic-kids': [u('photo-1525966222134-fcfa99b8ae77'), u('photo-1549298916-b41d501d3772')],
  'tenis-reaction-tech-masculino': [u('photo-1600185365483-26d7a4cc7519'), u('photo-1586350977771-b3b0abd50c82')],

  /* --- Acessórios --- */
  'bone-reaction-classic-ajustavel': [u('photo-1575428652377-a2d80e2277fc'), u('photo-1521369909029-2afed882baee')],
  'bone-reaction-snapback-urbano': [u('photo-1584735175315-9d5df23860e6'), u('photo-1521369909029-2afed882baee')],
  'meia-reaction-cano-longo-3-pares': [u('photo-1581655353564-df123a1eb820'), u('photo-1582966772680-860e372bb558')],
  'meia-reaction-esportiva-3-pares': [u('photo-1582966772680-860e372bb558'), u('photo-1581655353564-df123a1eb820')],
  'mochila-reaction-urban-25l': [u('photo-1622519407650-3df9883f76a5'), u('photo-1553062407-98eeb64c6a62')],
  'mochila-reaction-sling-tech': [u('photo-1553062407-98eeb64c6a62'), u('photo-1588850561407-ed78c282e89b')],
}

/** Foto usada quando um produto não tem imagem cadastrada. */
export const placeholderImage = absolute(
  'data:image/svg+xml;utf8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><rect width="400" height="500" fill="#F5F5F5"/><text x="200" y="250" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#757575">Reaction</text></svg>`,
    ),
)