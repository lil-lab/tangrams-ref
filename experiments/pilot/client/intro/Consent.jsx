import React from "react";

import { Centered, ConsentButton } from "meteor/empirica:core";
import BrowserDetection from "react-browser-detection";

export default class Consent extends React.Component {
  static renderConsent() {
    return (
      <Centered>
        <div className="consent bp3-ui-text">
          <h5 className="bp3-heading">INTRODUCTION</h5>
          <p>
            Thank you for participating in this research project! This research
            is conducted by: Ron Eliav (Bar Ilan University), Anya Ji (Cornell
            University), Robert Hawkins (Princeton University) and Yoav Artzi
            (Cornell University). This study takes approximately 25 minutes
            to complete, but exact timing might vary a bit. Your participation
            in this research is voluntary. You are free to refuse to take part,
            and you may stop taking part at any time without penalty. Below is a
            description of the research project, and your consent to
            participate. Read this information carefully. If you agree to
            participate, click "I agree" to indicate that you have read and
            understood the information provided on this consent form.
          </p>
          <h5 className="bp3-heading">PROCEDURES</h5>
          <p>
            If you agree to take part in the research, you will play a series of
            communication games with other participants: one of you will
            describe a picture for the other to choose out of a lineup of
            pictures. All of the information we obtain during the research will
            be kept confidential, and not associated with your name in any way.
            However, while the study is running it will be associated with your
            worker id. Once the study is complete we will replace your worker id
            with a random string. <br />
            Please note that the study is being conducted with the help of
            Prolific (recruitment), Empirica (game lobby), and Meteor (hosting),
            companies not affiliated with Cornell and with their own privacy and
            security policies that you can find at their website. We anticipate
            that your participation in this study presents no greater risk than
            everyday use of the Internet.
          </p>
          <h5 className="bp3-heading">Benefits and Risks</h5>
          <p>
            <strong>Benefits:</strong> The research team expects to learn about
            how humans communicate and solve problems together, which we hope
            will result in one or more academic publications. These publications
            will share our results for the benefit of the scientific community
            and the broader public.
          </p>
          <p>
            <strong>Risks: </strong> During your participation, you may
            experience frustration if you are unable to communicate effectively
            with your partner or if your partner disconnects and terminates the
            game early. To help reduce such risks, the research team will
            include comprehension checking steps to ensure that all participants
            understand the task.
          </p>

          <h5 className="bp3-heading">INCENTIVES FOR PARTICIPATION</h5>
          <p>
            There are 40 rounds in a game in total. You will receive $5.5 for
            completing the whole game. You receive an
            additional $0.03 bonus per round for each correct answer ($1.2 max).
          </p>

          <h5 className="bp3-heading">IF YOU HAVE QUESTIONS</h5>
          <p>
            The main researcher conducting this study is Yoav Artzi, a professor
            at Cornell University, and Robert Hawkins, a post-doc at Princeton
            University. Please ask any questions you have now. If you have
            questions later, you may contact Yoav Artzi at{" "}
            <a href="mailto: yoav@cs.cornell.edu">yoav@cs.cornell.edu</a> or
            Robert Hawkins at{" "}
            <a href="mailto: rdhawkins@princeton.edu">
              rdhawkins@princeton.edu
            </a>
            . If you have any questions or concerns regarding your rights as a
            subject in this study, you may contact the Institutional Review
            Board (IRB) for Human Participants at 607-255-5138 or access their
            website at{" "}
            <a href="https://researchservices.cornell.edu/offices/IRB">
              https://researchservices.cornell.edu/offices/IRB
            </a>
            . You may also report your concerns or complaints anonymously
            through Ethicspoint online at{" "}
            <a href="http://www.hotline.cornell.edu">www.hotline.cornell.edu</a> or by
            calling toll free at 1-866-293-3077. Ethicspoint is an independent
            organization that serves as a liaison between the University and the
            person bringing the complaint so that anonymity can be ensured.
          </p>

          <h5 className="bp3-heading">YOUR AUTHORITY TO PARTICIPATE</h5>
          <p>
            You represent that you have the full right and authority to sign
            this form, and if you are a minor that you have the consent (as
            indicated below) of your legal guardian to sign and acknowledge this
            form. By signing this form, you confirm that you understand the
            purpose of the project and how it will be conducted and consent to
            participate on the terms set forth above.
          </p>
          <p>
            By consenting to participate, you acknowledge that you are 18 years
            or older, have read this consent form, agree to its contents, and
            agree to take part in this research. If you do not wish to consent,
            close this page and return the task.
          </p>
          <ConsentButton text="I AGREE" />
        </div>
      </Centered>
    );
  }

  renderNoFirefox = () => {
    console.log("this is fire fox");
    return (
      <div className="consent">
        <h1
          className="bp3-heading"
          style={{ textAlign: "center", color: "red" }}
        >
          DO NOT USE FIREFOX!!
        </h1>
        <p style={{ textAlign: "center" }}>
          Please, don't use firefox! It breaks our game and ruins the experience
          for your potential teammates!
        </p>
      </div>
    );
  };

  render() {
    const browserHandler = {
      default: (browser) =>
        browser === "firefox"
          ? this.renderNoFirefox()
          : Consent.renderConsent(),
    };

    return (
      <Centered>
        <BrowserDetection>{browserHandler}</BrowserDetection>
      </Centered>
    );
  }
}
