/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import { withLinks } from "@storybook/addon-links";
import { storiesOf } from "@storybook/react";
import React from "react";
import PageRequestReview from ".";
import { mockExperimentQuery } from "../../lib/mocks";
import { RouterSlugProvider } from "../../lib/test-utils";
import { NimbusExperimentStatus } from "../../types/globalTypes";
import { createMutationMock } from "./mocks";
import { MockConfigContext } from "../../hooks/useConfig";

const { mock, experiment } = mockExperimentQuery("demo-slug");

storiesOf("pages/RequestReview", module)
  .addDecorator(withLinks)
  .add("success", () => (
    <RouterSlugProvider mocks={[mock, createMutationMock(experiment.id!)]}>
      <PageRequestReview polling={false} />
    </RouterSlugProvider>
  ))
  .add("error", () => (
    <RouterSlugProvider mocks={[mock]}>
      <PageRequestReview polling={false} />
    </RouterSlugProvider>
  ))
  .add("non-reviewable", () => {
    const { mock } = mockExperimentQuery("demo-slug", {
      status: NimbusExperimentStatus.ACCEPTED,
    });

    return (
      <RouterSlugProvider mocks={[mock]}>
        <PageRequestReview polling={false} />
      </RouterSlugProvider>
    );
  });

storiesOf("pages/RequestReview/EXP-866", module)
  .addDecorator((getStory) => (
    <MockConfigContext.Provider
      value={{ featureFlags: { exp866Preview: true } }}
    >
      {getStory()}
    </MockConfigContext.Provider>
  ))
  .add("draft status", () => {
    return (
      <RouterSlugProvider mocks={[mock]}>
        <PageRequestReview polling={false} />
      </RouterSlugProvider>
    );
  })
  .add("preview status", () => {
    const { mock } = mockExperimentQuery("demo-slug", {
      // @ts-ignore EXP-866 mock value until backend API & types are updated
      status: "PREVIEW",
    });
    return (
      <RouterSlugProvider mocks={[mock]}>
        <PageRequestReview polling={false} />
      </RouterSlugProvider>
    );
  });
