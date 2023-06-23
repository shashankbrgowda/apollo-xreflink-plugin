import Plugin from '@jbrowse/core/Plugin'
import PluginManager from '@jbrowse/core/PluginManager'
import { version } from '../package.json'

export default class TemplatePlugin extends Plugin {
  name = 'ApolloXrefLinkPlugin'
  version = version

  getIds = (id: any) => {
    return Array.isArray(id) ? id : [id]
  }

  getLinks = (ids: Array<any>, url: any, key: any) => {
    return ids
      .filter((id) => id !== '-')
      .map((id) => {
        return `<a href=${url}${id}>${key}:${id}</a>`
      })
  }

  getDbXrefLink = (id: any, url_mapping: any) => {
    const [root, content1, content2] = id.split(':')
    return content2
      ? `<a href=${url_mapping[root]}${content1}:${content2}>${id}</a>`
      : `<a href=${url_mapping[root]}${content1}>${id}</a>`
  }

  configure(pluginManager: PluginManager) {
    pluginManager.jexl.addFunction(
      'apolloxreflink',
      (dict: Record<string, string>, feature: any) => {
        let xrefs: any[] = []
        const dbxref_aliases = ['dbxref', 'dbxref', 'db_xref']

        Object.keys(dict).forEach((key) => {
          if (feature[key]) {
            if (dbxref_aliases.includes(key.toLowerCase())) {
              this.getIds(feature[key]).forEach((id) => {
                xrefs.push(this.getDbXrefLink(id, dict[key]))
              })
            } else {
              const ids: any[] = this.getIds(feature[key])
              xrefs.push(...this.getLinks(ids, dict[key], key))
            }
          }
        })
        return xrefs
      },
    )
  }
}
