module.exports = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrder: [
    "^#/authentication/(.*)$",
    "^#/components/(.*)$",
    "^#/pages/(.*)$",
    "^#/routes/(.*)$",
    "^#/(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};
