/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { withLinks } from "@storybook/addon-links";
import { withQuery } from "@storybook/addon-queryparams";
import { storiesOf } from "@storybook/react";
import React from "react";
import PageEditAudience from ".";
import { mockExperimentQuery } from "../../lib/mocks";
import { RouterSlugProvider } from "../../lib/test-utils";

const { mock } = mockExperimentQuery("demo-slug");
const { mock: mockMissingFields } = mockExperimentQuery("demo-slug", {
  channel: null,
  firefoxMinVersion: null,
  targetingConfigSlug: null,
  proposedEnrollment: 0,
  proposedDuration: 0,
  readyForReview: {
    __typename: "NimbusReadyForReviewType",
    ready: false,
    message: {
      proposed_duration: ["This field may not be null."],
      proposed_enrollment: ["This field may not be null."],
      firefox_min_version: ["This field may not be null."],
      targeting_config_slug: ["This field may not be null."],
      channel: ["This field may not be null."],
    },
  },
});

storiesOf("pages/EditAudience", module)
  .addDecorator(withLinks)
  .addDecorator(withQuery)
  .add("basic", () => (
    <RouterSlugProvider mocks={[mock]}>
      <PageEditAudience />
    </RouterSlugProvider>
  ))
  .add(
    "missing fields",
    () => (
      <RouterSlugProvider mocks={[mockMissingFields]}>
        <PageEditAudience />
      </RouterSlugProvider>
    ),
    {
      query: {
        "show-errors": true,
      },
    },
  );
