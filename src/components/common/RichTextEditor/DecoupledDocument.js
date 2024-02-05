// DecoupledDocument.js

import DecoupledDocument from "@ckeditor/ckeditor5-build-decoupled-document";

DecoupledDocument.create(document.querySelector("#editor"), {
  toolbar: {
    items: [
      "heading",
      "|",
      "bold",
      "fontSize",
      "fontColor",
      "|",
      "alignment",
      "|",
      "link",
    ],
  },
});

export default DecoupledDocument;
