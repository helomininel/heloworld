/**
 * Recipe data for the cookbook — shared by the grid pages (recipes.astro),
 * the detail pages (recipes/[slug].astro), and their PT counterparts.
 *
 * Shared fields (id, category, img) are defined ONCE per recipe; only text is
 * translated (en/pt). `recipesEn` / `recipesPt` export the flat, locale-merged
 * shape the pages consume.
 *
 * Text fields: title, categoryLabel, time, servings, desc, alt,
 * ingredients[] ('## ' prefix renders a bold group header),
 * instructions[] (<strong> allowed for step titles), tips[], sources[].
 */
import pumpkinCupcakeImg from '~/assets/images/recipes/pumpkin-cupcake.jpg';
import iogurtBerryCakeImg from '~/assets/images/recipes/iogurt-berry-cake-2.jpg';
import iogurtBerryCupcakesImg from '~/assets/images/recipes/iogurt-berry-cupcakes.jpg';

export interface RecipeSource {
  label: string;
  url: string;
}

export interface RecipeText {
  title: string;
  categoryLabel: string;
  time: string;
  servings: string;
  /** Difficulty shown in the hero metrics (e.g. 'Easy' / 'Fácil'). */
  level?: string;
  desc: string;
  alt: string;
  ingredients: string[];
  instructions: string[];
  tips?: string[];
  sources?: RecipeSource[];
}

interface RecipeEntry {
  id: string;
  category: 'main' | 'breakfast' | 'desserts';
  /** Resolved image URL (ESM import) or '' when the recipe has no photo yet. */
  img: string;
  /** Extra photos shown as a gallery under the instructions (optional). */
  gallery?: string[];
  en: RecipeText;
  pt: RecipeText;
}

const recipes: RecipeEntry[] = [
  {
    id: 'pumpkin-cupcakes',
    category: 'desserts',
    img: pumpkinCupcakeImg.src,
    en: {
      title: 'Pumpkin Cupcakes with Cream Cheese Frosting',
      categoryLabel: 'Desserts',
      time: '⏱ 45 min',
      servings: '● 12 servings',
      level: 'Easy',
      desc: 'Moist pumpkin spice cupcakes topped with a creamy, tangy cream cheese frosting.',
      alt: 'Pumpkin cupcakes with cream cheese frosting',
      ingredients: [
        '## For the Pumpkin Cupcakes',
        '125 g all-purpose flour',
        '1 tsp baking powder',
        '1/2 tsp baking soda',
        '1/2 tsp salt',
        '1 tsp ground cinnamon',
        '1 1/2 tsp pumpkin pie spice',
        '120 ml (1/2 cup) canola or vegetable oil',
        '2 large eggs',
        '100 g light or dark brown sugar',
        '226 g (1 cup) pumpkin purée',
        '1 tsp vanilla extract',
        '## For the Cream Cheese Frosting',
        '200 g full-fat cream cheese, at room temperature',
        '100 g butter, at room temperature',
        '100 g sugar',
        '1/2 tsp vanilla extract',
        'A squeeze of lemon juice',
      ],
      instructions: [
        '<strong>Prepare the Oven.</strong> Preheat the oven to 175 °C fan-assisted (or 177 °C conventional). Line a 12-hole muffin tin.',
        '<strong>Combine the Dry Ingredients.</strong> In a large bowl, whisk together the flour, baking powder, baking soda, salt, cinnamon, and spices until evenly combined.',
        '<strong>Mix the Wet Ingredients + Sugar.</strong> In a separate bowl, whisk together the oil, eggs, sugar, pumpkin purée, and vanilla extract until smooth.',
        '<strong>Combine.</strong> Add the wet ingredients to the dry ingredients and mix gently until no dry flour remains.',
        '<strong>Bake the Cupcakes.</strong> Divide the batter evenly among the 12 cupcake cases, filling each approximately two-thirds full. Bake for 20–22 minutes, or until a toothpick inserted into the centre comes out clean. Allow to cool completely before frosting.',
        '<strong>Prepare the Cream Cheese Frosting.</strong> Ensure the cream cheese and butter are at room temperature. Beat them together on medium-low speed for 1–2 minutes until smooth, scraping down the sides of the bowl as needed.',
        '<strong>Add the Sugar and Flavouring.</strong> Sift in the sugar and add the vanilla extract. Beat on low speed until combined, then on medium-high for another 1–2 minutes until light and fluffy. Add a small squeeze of lemon juice and mix briefly.',
        '<strong>Frost and Serve.</strong> Once the cupcakes have cooled completely, spread or pipe the frosting over each cupcake. Serve immediately or refrigerate until ready to serve.',
      ],
      tips: [
        'Use full-fat block cream cheese rather than spreadable cream cheese from a tub for a thicker frosting.',
        'Make sure the cupcakes are completely cool before frosting to prevent the frosting from melting.',
        'Store frosted cupcakes in an airtight container in the refrigerator.',
        'Let the cupcakes sit at room temperature briefly before serving for the best texture.',
      ],
      sources: [
        {
          label: "Sally's Baking Addiction – Pumpkin Cupcakes",
          url: 'https://sallysbakingaddiction.com/pumpkin-cupcakes-with-cream-cheese-frosting/',
        },
        {
          label: 'The Bojon Gourmet – Cream Cheese Frosting',
          url: 'https://bojongourmet.com/cream-cheese-frosting/',
        },
      ],
    },
    pt: {
      title: 'Cupcakes de Abóbora com Cream Cheese Frosting',
      categoryLabel: 'Sobremesas',
      time: '⏱ 45 min',
      servings: '● 12 cupcakes',
      level: 'Fácil',
      desc: 'Cupcakes de abóbora e especiarias, cobertos com creme de Cream Cheese.',
      alt: 'Cupcakes de abóbora com cobertura de cream cheese',
      ingredients: [
        '## Para os Cupcakes de Abóbora',
        '125 g de farinha de trigo',
        '1 colher de chá de fermento em pó',
        '1/2 colher de chá de bicarbonato de sódio',
        '1/2 colher de chá de sal',
        '1 colher de chá de canela em pó',
        '1 1/2 colheres de chá de mistura de especiarias para tarte de abóbora',
        '120 ml (1/2 chávena) de óleo de colza ou óleo vegetal',
        '2 ovos grandes',
        '100 g de açúcar mascavado claro ou escuro',
        '226 g (1 chávena) de puré de abóbora',
        '1 colher de chá de extrato de baunilha',
        '## Para a Cobertura de Cream Cheese',
        '200 g de cream cheese gordo, à temperatura ambiente',
        '100 g de manteiga, à temperatura ambiente',
        '100 g de açúcar',
        '1/2 colher de chá de extrato de baunilha',
        'Um pouco de sumo de limão',
      ],
      instructions: [
        '<strong>Preparar o Forno.</strong> Pré-aqueça o forno a 175 °C com ventilação (ou 177 °C sem ventilação). Prepare um tabuleiro para 12 cupcakes.',
        '<strong>Misturar os Ingredientes Secos.</strong> Numa taça grande, misture a farinha, o fermento em pó, o bicarbonato de sódio, o sal, a canela e as especiarias até obter uma mistura homogénea.',
        '<strong>Misturar os Ingredientes Líquidos e o Açúcar.</strong> Numa taça separada, bata o óleo, os ovos, o açúcar, o puré de abóbora e o extrato de baunilha até obter uma mistura homogénea.',
        '<strong>Combinar.</strong> Adicione os ingredientes líquidos aos ingredientes secos e envolva delicadamente até deixar de haver farinha seca.',
        '<strong>Levar os Cupcakes ao Forno.</strong> Distribua a massa uniformemente pelas 12 formas, enchendo cada uma até cerca de dois terços da sua capacidade. Leve ao forno durante 20–22 minutos, ou até que um palito inserido no centro saia limpo. Deixe arrefecer completamente antes de colocar a cobertura.',
        '<strong>Preparar a Cobertura de Cream Cheese.</strong> Certifique-se de que o cream cheese e a manteiga estão à temperatura ambiente. Bata-os juntos, em velocidade média-baixa, durante 1–2 minutos, até obter um creme suave, raspando as laterais da taça sempre que necessário.',
        '<strong>Adicionar o Açúcar e os Aromas.</strong> Peneire o açúcar em pó e adicione o extrato de baunilha. Bata em velocidade baixa até incorporar e, em seguida, aumente para velocidade média-alta durante mais 1–2 minutos, até obter um creme leve e fofo. Adicione um pouco de sumo de limão e misture brevemente.',
        '<strong>Decorar e Servir.</strong> Quando os cupcakes estiverem completamente frios, espalhe a cobertura por cima ou utilize um saco de pasteleiro para os decorar. Sirva de imediato ou conserve no frigorífico até ao momento de servir.',
      ],
      tips: [
        'Utilize cream cheese gordo em bloco, em vez de cream cheese para barrar vendido em embalagem, para obter uma cobertura mais firme.',
        'Certifique-se de que os cupcakes estão completamente frios antes de adicionar a cobertura, para evitar que derreta.',
        'Guarde os cupcakes com cobertura num recipiente hermético, no frigorífico.',
        'Para obter a melhor textura, retire os cupcakes do frigorífico algum tempo antes de servir, para que fiquem ligeiramente à temperatura ambiente.',
      ],
      sources: [
        {
          label: "Sally's Baking Addiction – Pumpkin Cupcakes",
          url: 'https://sallysbakingaddiction.com/pumpkin-cupcakes-with-cream-cheese-frosting/',
        },
        {
          label: 'The Bojon Gourmet – Cream Cheese Frosting',
          url: 'https://bojongourmet.com/cream-cheese-frosting/',
        },
      ],
    },
  },
  {
    id: 'yogurt-olive-oil-berry-cake',
    category: 'desserts',
    img: iogurtBerryCakeImg.src,
    gallery: [iogurtBerryCupcakesImg.src],
    en: {
      title: 'Yogurt, Olive Oil and Berry Cake',
      categoryLabel: 'Desserts',
      time: '⏱ 60 min',
      servings: '● 10 servings',
      level: 'Easy',
      desc: 'A simple yogurt and olive oil cake filled with juicy berries and topped with sliced almonds. Easy to make by hand, with fresh or frozen fruit.',
      alt: 'Yogurt, olive oil and berry cake topped with sliced almonds',
      ingredients: [
        '10 tbsp sugar (160 g) — I used 5 tbsp last time',
        '3 eggs',
        '5 tbsp yogurt (105 g)',
        '5 tbsp extra virgin olive oil',
        '230 g all-purpose flour (approximately 17 tbsp)',
        '16 g baking powder (approximately 1 1/2 tbsp)',
        '125 g mixed berries, or any fruit of your choice',
        'Sliced almonds, for topping',
        'Vanilla extract, optional',
      ],
      instructions: [
        '<strong>Prepare the Oven.</strong> Preheat the oven to 180 °C (350 °F). Grease a baking dish or line it with parchment paper.',
        '<strong>Mix the Eggs and Sugar.</strong> Beat the eggs, add the sugar, and mix well until combined.',
        '<strong>Add the Remaining Ingredients.</strong> Add the yogurt, olive oil, flour, baking powder, and vanilla extract, if using. Mix until you have a smooth batter. You can do this entirely by hand.',
        '<strong>Fold in the Berries.</strong> Add the berries and gently fold them into the batter. If using frozen berries, there is no need to thaw them first.',
        '<strong>Prepare the Cake.</strong> Pour the batter into the prepared baking dish and sprinkle the sliced almonds evenly over the top.',
        '<strong>Bake.</strong> Bake for 40–45 minutes, or until a toothpick inserted into the centre comes out clean.',
        '<strong>Cool and Serve.</strong> Allow the cake to cool slightly before slicing and serving.',
      ],
      tips: [
        'You can reduce the sugar to 5 tablespoons (80 g) for a less sweet cake.',
        'Use frozen berries straight from the freezer; thawing is not necessary.',
        'Try other fruits, such as chopped apples, peaches, or pears.',
        'Mix the batter by hand to keep the preparation simple.',
        'You can use a rectangular baking dish or make individual cupcakes instead.',
        'Check the cake towards the end of the baking time, as ovens and baking dishes can vary.',
      ],
      sources: [],
    },
    pt: {
      title: 'Bolo de Iogurte, Azeite e Frutos Vermelhos',
      categoryLabel: 'Sobremesas',
      time: '⏱ 60 min',
      servings: '● 10 porções',
      level: 'Fácil',
      desc: 'Um bolo simples de iogurte e azeite, com frutos vermelhos e amêndoa laminada. Fácil de preparar à mão e perfeito para aproveitar fruta fresca ou congelada.',
      alt: 'Bolo de iogurte, azeite e frutos vermelhos com amêndoa laminada',
      ingredients: [
        '10 colheres de sopa de açúcar (160 g) — da última vez, usei apenas 5 colheres',
        '3 ovos',
        '5 colheres de sopa de iogurte (105 g)',
        '5 colheres de sopa de azeite virgem extra',
        '230 g de farinha de trigo (aproximadamente 17 colheres de sopa)',
        '16 g de fermento em pó (aproximadamente 1 1/2 colheres de sopa)',
        '125 g de frutos vermelhos, ou outra fruta à escolha',
        'Amêndoa laminada, para decorar',
        'Extrato de baunilha, opcional',
      ],
      instructions: [
        '<strong>Preparar o Forno.</strong> Pré-aqueça o forno a 180 °C. Unte uma forma ou travessa com manteiga ou azeite, ou forre-a com papel vegetal.',
        '<strong>Misturar os Ovos e o Açúcar.</strong> Bata os ovos, adicione o açúcar e misture bem.',
        '<strong>Adicionar os Restantes Ingredientes.</strong> Junte o iogurte, o azeite, a farinha, o fermento e o extrato de baunilha, se desejar. Misture até obter uma massa homogénea. Pode fazer tudo à mão.',
        '<strong>Adicionar os Frutos Vermelhos.</strong> Junte os frutos vermelhos e envolva delicadamente na massa. Se utilizar fruta congelada, não é necessário descongelá-la previamente.',
        '<strong>Preparar o Bolo.</strong> Verta a massa para a forma preparada e distribua a amêndoa laminada por cima.',
        '<strong>Levar ao Forno.</strong> Leve ao forno durante 40–45 minutos, ou até que um palito inserido no centro saia limpo.',
        '<strong>Deixar Arrefecer e Servir.</strong> Deixe o bolo arrefecer ligeiramente antes de cortar e servir.',
      ],
      tips: [
        'Pode reduzir a quantidade de açúcar para 5 colheres de sopa (80 g), para um bolo menos doce.',
        'Utilize os frutos vermelhos diretamente do congelador, sem necessidade de os descongelar.',
        'Experimente outras frutas, como maçã, pêssego ou pera cortados em pedaços.',
        'Misture a massa à mão para uma preparação simples e rápida.',
        'Você pode fazer em uma forma retangular ou em formas de cupcake.',
        'Verifique o bolo perto do final do tempo de cozedura, pois o tempo pode variar consoante o forno e a forma utilizada.',
      ],
      sources: [],
    },
  },
];

const flatten = (r: RecipeEntry, lang: 'en' | 'pt') => ({ ...r, ...r[lang] });

/** Flat, locale-merged shape consumed by the pages. */
export type Recipe = RecipeEntry & RecipeText;

export const recipesEn: Recipe[] = recipes.map((r) => flatten(r, 'en'));
export const recipesPt: Recipe[] = recipes.map((r) => flatten(r, 'pt'));
