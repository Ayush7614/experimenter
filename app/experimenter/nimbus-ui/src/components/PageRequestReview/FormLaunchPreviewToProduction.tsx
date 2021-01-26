/* istanbul ignore file until EXP-866 final */
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Form from "react-bootstrap/Form";
import FormLaunchConfirmationCheckboxes from "./FormLaunchConfirmationCheckboxes";

const FormLaunchPreviewToProduction = ({
  isLoading,
  onSubmit,
  onBackToDraft,
}: {
  isLoading: boolean;
  onSubmit: () => void;
  onBackToDraft: () => void;
}) => {
  const [allBoxesChecked, setAllBoxesChecked] = useState(false);

  return (
    <Alert variant="warning">
      <Form className="py-2">
        <p>
          This experiment is currently <strong>live for testing</strong>, but
          you will need to let QA know in your PI request. When you have
          recieved a sign-off, click “Request launch” to launch the experiment.
        </p>

        <FormLaunchConfirmationCheckboxes onChange={setAllBoxesChecked} />

        <div className="d-flex bd-highlight">
          <div className="py-2">
            <button
              data-testid="submit-button"
              type="button"
              className="mr-2 btn btn-primary"
              disabled={isLoading || !allBoxesChecked}
              onClick={onSubmit}
            >
              Request Launch
            </button>
            <button
              data-testid="submit-button"
              type="button"
              className="btn btn-secondary"
              disabled={isLoading}
              onClick={onBackToDraft}
            >
              Go Back to Draft
            </button>
          </div>
        </div>
      </Form>
    </Alert>
  );
};

export default FormLaunchPreviewToProduction;
