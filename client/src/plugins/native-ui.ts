import {
  create,
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NMenu,
  NSpace,
  NText,
  NGrid,
  NGridItem,
  NConfigProvider,
  NP,
  NH1,
  NH2,
  NH3,
  NH4,
  NH5,
  NH6,
} from "naive-ui";

const components = [
  NLayout,
  NLayoutContent,
  NLayoutFooter,
  NLayoutHeader,
  NMenu,
  NSpace,
  NText,
  NGrid,
  NGridItem,
  NConfigProvider,
  NP,
  NH1,
  NH2,
  NH3,
  NH4,
  NH5,
  NH6,
];
const naive = create({
  components,
});

export default naive;
