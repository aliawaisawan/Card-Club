import React, { useEffect } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <Navigation />
      <div className="container">
        <h2><strong>Privacy Policy</strong> </h2>
        <br />
        <br />
        This Privacy Policy is prepared by CardClub and whose registered address
        is USA (“We”) are committed to protecting and preserving the privacy of
        our visitors when visiting our site or communicating electronically with
        us.
        <br />
        <br />
        This policy sets out how we process any personal data we collect from
        you or that you provide to us through our website and social media
        sites. We confirm that we will keep your information secure and comply
        fully with all applicable USA Data Protection legislation and
        regulations. Please read the following carefully to understand what
        happens to personal data that you choose to provide to us, or that we
        collect from you when you visit our sites. By submitting information you
        are accepting and consenting to the practices described in this policy.
        <br />
        <br />
        <h4>
          <strong>Types of information we may collect from you</strong>
        </h4>
        We may collect, store and use the following kinds of personal
        information about individuals who visit and use our website and social
        media sites:
        <br />
        <br />
        <strong>Information you supply to us.</strong> You may supply us with
        information about you by filling in forms on our website or social
        media. This includes information you provide when you submit a
        contact/inquiry form. The information you give us may include but is not
        limited to, your name, address, e-mail address, and phone number.
        <br />
        <br />
        <h4>
          <strong>How we may use the information we collect</strong>
        </h4>
        <br />
        <br />
        We use the information in the following ways:
        <br />
        <br />
        <ul>
          <strong>Information you supply to us.</strong> We will use this
          information:
          <li>
            to provide you with information and/or services that you request
            from us;
          </li>
          .<li>To contact you to provide the information requested.</li>
        </ul>
        <br />
        <br />
        <h4>
          <strong>Disclosure of your information</strong>
        </h4>
        Any information you provide to us will either be emailed directly to us
        or may be stored on a secure server.
        <br />
        <br />
        We do not rent, sell or share personal information about you with other
        people or non-affiliated companies.
        <br />
        <br />
        We will use all reasonable efforts to ensure that your personal data is
        not disclosed to regional/national institutions and authorities unless
        required by law or other regulations.
        <br />
        <br />
        Unfortunately, the transmission of information via the internet is not
        completely secure. Although we will do our best to protect your personal
        data, we cannot guarantee the security of your data transmitted to our
        site; any transmission is at your own risk. Once we have received your
        information, we will use strict procedures and security features to try
        to prevent unauthorized access.
        <br />
        <br />
        <h4>
          <strong>Your rights – access to your personal data</strong>
        </h4>
        <br />
        <br />
        You have the right to ensure that your personal data is being processed
        lawfully (“Subject Access Right”). Your subject access right can be
        exercised in accordance with data protection laws and regulations. Any
        subject access request must be made in writing to [insert contact
        details]. We will provide your personal data to you within the statutory
        time frames. To enable us to trace any of your personal data that we may
        be holding, we may need to request further information from you. If you
        complain about how we have used your information, you have the right to
        complain to the Information Commissioner’s Office (ICO).
        <br />
        <br />
        <h4>
          <strong>Changes to our privacy policy</strong>
        </h4>
        <br />
        <br />
        Any changes we may make to our privacy policy in the future will be
        posted on this page and, where appropriate, notified to you by e-mail.
        Please check back frequently to see any updates or changes to our
        privacy policy.
        <br />
        <br />
        <h4>
          <strong>Contact</strong>
        </h4>
        <br />
        <br />
        Questions, comments, and requests regarding this privacy policy are
        welcomed and should be addressed to cardclub.reminders@gmail.com.
        <br />
        <br />
      </div>
      <Footer />
    </>
  );
}

export default Home;
