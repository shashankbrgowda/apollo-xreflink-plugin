# apollo-xreflink-plugin

> Plugin to provide xref hyperlinks in jbrowse. We need to provide the xref id to url mappings to the plugin through jbrowse config file.

### Software requirements

- [git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/en/download/) (version 10 or greater)
- [yarn](https://yarnpkg.com/en/docs/install) (or npm which comes with Node.js)
- [JBrowse 2](https://github.com/gmod/jbrowse-components) (version 2.0 or greater)

### Usage

If you are using JBrowse Web, after the plugin is published to NPM, you can use [unpkg](https://unpkg.com/) to host plugin bundle.

A JBrowse Web config using this plugin would look like this:

```json
{
  "configuration": {
    "formatDetails": {
      "feature": "jexl: {xrefs:apolloxreflink({interpro: 'https://www.ebi.ac.uk/interpro/entry/InterPro/',db_xref: {COG: 'https://www.ncbi.nlm.nih.gov/research/cog/cog/'}}, feature)}",
      "subfeatures": "jexl: {xrefs:apolloxreflink({interpro: 'https://www.ebi.ac.uk/interpro/entry/InterPro/',db_xref: {COG: 'https://www.ncbi.nlm.nih.gov/research/cog/cog/'}}, feature)}"
    }
  },
  "plugins": [
    {
      "name": "ApolloXrefLinkPlugin",
      "url": "https://unpkg.com/apollo-xreflink-plugin@0.0.7/dist/apollo-xreflink-plugin.umd.production.min.js"
    }
  ]
}
```

In format details we are passing xref attribute (should match attribute names in gff3 file) to URL mapping. Note that dbxref field can contain different xrefs, we need to pass respective url mapping accordingly.

For the above example ninth column in gff3 file might look like this.
```
ID=bc2017--bc2017_00013;Pfam=PF07470;InterPro=IPR008928,IPR010905,-;db_xref=COG:COG2204
```

**Note:** The current version of `apollo-xreflink-plugin` is only compatible with "JBrowse 2" v2.0 or greater. If you are developing for a version of "JBrowse 2" v1.x, please consider upgrading, or you will have to manually downgrade the package dependencies in this template to ensure compatibility.