/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { getExperiment_experimentBySlug } from "../../types/getExperiment";
import { NimbusDocumentationLinkTitle } from "../../types/globalTypes";

type DefaultDocumentationLink = {
  title: NimbusDocumentationLinkTitle | "";
  link: string;
};

export type AnnotatedDocumentationLink = DefaultDocumentationLink & {
  key: string;
  isValid: boolean;
  isDirty: boolean;
  errors: Record<string, string[]>;
};

export const setupDocumentationLinks = (
  existing?: getExperiment_experimentBySlug["documentationLinks"],
) => {
  const hasExisting = existing && existing.length > 0;
  return hasExisting
    ? (existing! as DefaultDocumentationLink[]).map(annotateDocumentationLink)
    : [emptyDocumentationLink()];
};

export const emptyDocumentationLink = (index = 0) => {
  return annotateDocumentationLink({ title: "", link: "" }, index);
};

export function annotateDocumentationLink(
  documentationLink: DefaultDocumentationLink,
  index: number,
) {
  return {
    ...documentationLink,
    key: `doc-link-${index}`,
    isValid: true,
    isDirty: false,
    errors: {},
  };
}

export function stripInvalidDocumentationLinks(data: Record<string, any>) {
  let documentationLinks: DefaultDocumentationLink[] = data.documentationLinks;

  if (!documentationLinks || !documentationLinks.length) {
    return data;
  }

  documentationLinks = documentationLinks.filter(
    (documentationLink) =>
      documentationLink.title.length && documentationLink.link.length,
  );

  return {
    ...data,
    documentationLinks,
  };
}
