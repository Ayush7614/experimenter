/* istanbul ignore file until EXP-866 final */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import { ReactComponent as ExternalIcon } from "../../images/external.svg";
import LinkExternal from "../LinkExternal";
import { EXTERNAL_URLS } from "../../lib/constants";

const FormRequestReview = ({
  isLoading,
  onSubmit,
  onLaunchWithoutPreview,
}: {
  isLoading: boolean;
  onSubmit: () => void;
  onLaunchWithoutPreview: () => void;
}) => {
  return (
    <Alert variant="warning">
      <Form>
        <p>
          Do you want to test this experiment before launching to production?{" "}
          <LinkExternal href={EXTERNAL_URLS.PREVIEW_LAUNCH_DOC}>
            <span className="mr-1">Learn more</span>
            <ExternalIcon />
          </LinkExternal>
        </p>

        <div className="d-flex bd-highlight">
          <div className="">
            <button
              data-testid="submit-button"
              type="button"
              className="mr-2 btn btn-primary"
              disabled={isLoading}
              onClick={onSubmit}
            >
              Launch to Preview
            </button>
            <button
              data-testid="submit-button"
              type="button"
              className="btn btn-secondary"
              disabled={isLoading}
              onClick={onLaunchWithoutPreview}
            >
              Request Launch without Preview
            </button>
          </div>
        </div>
      </Form>
    </Alert>
  );
};

export default FormRequestReview;
