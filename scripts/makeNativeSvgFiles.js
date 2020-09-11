const fse = require("fs-extra");
const glob = require("glob");
const svgr = require('@svgr/core').default;

// Glob index.svg files inb packages
const svgIcons = glob.sync(`${process.cwd()}/node_modules/@iconbox/*/*/index.svg`);

/* eslint-disable indent */
const asyncForEach = async (array, callback) => {
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
};
const camelCase = d => {
  let name = '';
  if(d.indexOf('-') > -1) {
    name = d.split('-').map(a => a.replace(/^./, (match) => match.toUpperCase()).replace(/(\_\w)/g, k => k[1].toUpperCase())).join('');
  } else {
    name = d.replace(/^./, (match) => match.toUpperCase()).replace(/(\_\w)/g, k => k[1].toUpperCase());
  }

  return name;
};

const content = {};
let whole = "";
(async () => {
  await asyncForEach(svgIcons, async icon => {
    try {
      const fullPath = icon
        .substr(0, icon.lastIndexOf("/node_modules"));
      const sections = icon.split("/").splice(-3);
      const packName = sections[0];
      const iconName = sections[1];

      const svgFileContent = await fse.readFile(icon, "utf-8");

      await fse.ensureDirSync(`${fullPath}/IconBox`);
      await fse.ensureDirSync(`${fullPath}/IconBox/${packName}`);

      /**
       * Make index.js collections
       */
      let current =
        content[packName] ||
        `/**
* THIS IS AN AUTO GENERATED FILE, CHANGES COULD BE OVERWRITE
*/`;
      current += `
export { default as ${iconName} } from './${iconName}';`;
      content[packName] = current;

      /**
       * Convert svg to native svg
       * @type {(TextNode & {valid: boolean}) | (HTMLElement & {valid: boolean})}
      //  */
      svgr(svgFileContent, { icon: true, native: true }, { componentName: iconName }).then(async jsCode => {
        await fse.writeFile(
          `${fullPath}/IconBox/${packName}/${iconName}.js`,
          jsCode.replace('react-native-svg', 'react-sketchapp/lib/components/Svg'),
          "utf8"
        );
        console.log("Created: ", packName, iconName);
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  });

  for (const key in content) {
    whole += `export * as ${camelCase(key)} from "./${key}/index.js";`;
    await fse.writeFile(`${process.cwd()}/IconBox/${key}/index.js`, content[key], 'utf8');
  }
  await fse.writeFile(`${process.cwd()}/IconBox/index.js`, whole, 'utf8');
})();
