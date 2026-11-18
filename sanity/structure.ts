import type { StructureResolver } from "sanity/structure";

/**
 * Editor-facing sidebar — Communities and Models first (not a dump of all types).
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("BuiltOps content")
    .items([
      S.listItem()
        .title("Communities")
        .schemaType("community")
        .child(S.documentTypeList("community").title("Communities")),
      S.listItem()
        .title("Home models")
        .schemaType("homeModel")
        .child(S.documentTypeList("homeModel").title("Home models")),
      S.divider(),
      S.listItem()
        .title("All document types")
        .child(
          S.list()
            .title("All types")
            .items(S.documentTypeListItems()),
        ),
    ]);
