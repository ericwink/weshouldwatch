import { Container, Box, Typography } from "@mui/material";
import Link from "next/link";

const PrivacyPage = () => {
  return (
    <Container
      maxWidth="md"
      sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2, pb: 2 }}
    >
      <Typography
        variant="h3"
        component="h1"
      >
        Privacy policy
      </Typography>
      <Typography>
        We respect your privacy and are committed to protecting it through our compliance with this privacy policy (“Policy”). This Policy describes the types of information we may collect from you or that you may provide (“Personal Information”) on
        the weshouldwatch.app website (“Website” or “Service”) and any of its related products and services (collectively, “Services”), and our practices for collecting, using, maintaining, protecting, and disclosing that Personal Information. It
        also describes the choices available to you regarding our use of your Personal Information and how you can access and update it.
      </Typography>
      <Typography>
        This Policy is a legally binding agreement between you (“User”, “you” or “your”) and this Website operator (“Operator”, “we”, “us” or “our”). If you are entering into this Policy on behalf of a business or other legal entity, you represent
        that you have the authority to bind such entity to this Policy, in which case the terms “User”, “you” or “your” shall refer to such entity. If you do not have such authority, or if you do not agree with the terms of this Policy, you must not
        accept this Policy and may not access and use the Website and Services. By accessing and using the Website and Services, you acknowledge that you have read, understood, and agree to be bound by the terms of this Policy. This Policy does not
        apply to the practices of companies that we do not own or control, or to individuals that we do not employ or manage.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Automatic collection of information
      </Typography>
      <Typography>
        When you open the Website, our servers automatically record information that your browser sends. This data may include information such as your device’s IP address, browser type, and version, operating system type and version, language
        preferences or the webpage you were visiting before you came to the Website and Services, pages of the Website and Services that you visit, the time spent on those pages, information you search for on the Website, access times and dates, and
        other statistics.
      </Typography>
      <Typography>
        Information collected automatically is used only to identify potential cases of abuse and establish statistical information regarding the usage and traffic of the Website and Services. This statistical information is not otherwise aggregated
        in such a way that would identify any particular User of the system.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Collection of personal information
      </Typography>
      <Typography>
        You can access and use the Website and Services without telling us who you are or revealing any information by which someone could identify you as a specific, identifiable individual. If, however, you wish to use some of the features offered
        on the Website, you may be asked to provide certain Personal Information (for example, your name and e-mail address).
      </Typography>
      <Typography>We receive and store any information you knowingly provide to us when you create an account, publish content, make a purchase, or fill any forms on the Website. When required, this information may include the following:</Typography>
      <ol>
        <li>
          <Typography>- Account details (such as user name, unique user ID, password, etc)</Typography>
        </li>
        <li>
          <Typography>- Contact information (such as email address, phone number, etc)</Typography>
        </li>
      </ol>
      <Typography>
        Some of the information we collect is directly from you via the Website and Services. However, we may also collect Personal Information about you from other sources such as social media platforms, public databases, third-party data providers,
        and our joint partners. Personal Information we collect from other sources may include demographic information, such as age and gender, device information, such as IP addresses, location, such as city and state, and online behavioral data,
        such as information about your use of social media websites, page view information and search results and links.
      </Typography>
      <Typography>
        You can choose not to provide us with your Personal Information, but then you may not be able to take advantage of some of the features on the Website. Users who are uncertain about what information is mandatory are welcome to contact us.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Privacy of children
      </Typography>
      <Typography>{`We do not knowingly collect any Personal Information from children under the age of 18. If you are under the age of 18, please do not submit any Personal Information through the Website and Services. If you have reason to believe that a child under the age of 18 has provided Personal Information to us through the Website and Services, please contact us to request that we delete that child’s Personal Information from our Services.`}</Typography>
      <Typography>{`We encourage parents and legal guardians to monitor their children’s Internet usage and to help enforce this Policy by instructing their children never to provide Personal Information through the Website and Services without their permission. We also ask that all parents and legal guardians overseeing the care of children take the necessary precautions to ensure that their children are instructed to never give out Personal Information when online without their permission.`}</Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Use and processing of collected information
      </Typography>
      <Typography>
        We act as a data controller and a data processor in terms of the GDPR when handling Personal Information, unless we have entered into a data processing agreement with you in which case you would be the data controller and we would be the data
        processor.
      </Typography>
      <Typography>
        Our role may also differ depending on the specific situation involving Personal Information. We act in the capacity of a data controller when we ask you to submit your Personal Information that is necessary to ensure your access and use of
        the Website and Services. In such instances, we are a data controller because we determine the purposes and means of the processing of Personal Information and we comply with data controllers’ obligations set forth in the GDPR.
      </Typography>
      <Typography>
        We act in the capacity of a data processor in situations when you submit Personal Information through the Website and Services. We do not own, control, or make decisions about the submitted Personal Information, and such Personal Information
        is processed only in accordance with your instructions. In such instances, the User providing Personal Information acts as a data controller in terms of the GDPR.
      </Typography>
      <Typography>
        In order to make the Website and Services available to you, or to meet a legal obligation, we may need to collect and use certain Personal Information. If you do not provide the information that we request, we may not be able to provide you
        with the requested products or services. Any of the information we collect from you may be used for the following purposes:
      </Typography>
      <ol>
        <li>
          <Typography>- Create and manage user accounts</Typography>
        </li>
        <li>
          <Typography>- Deliver products or services</Typography>
        </li>
        <li>
          <Typography>- Run and operate the Website and Services</Typography>
        </li>
      </ol>
      <Typography>
        Processing your Personal Information depends on how you interact with the Website and Services, where you are located in the world and if one of the following applies: (i) you have given your consent for one or more specific purposes; this,
        however, does not apply, whenever the processing of Personal Information is subject to California Consumer Privacy Act or European data protection law; (ii) provision of information is necessary for the performance of this Policy with you
        and/or for any pre-contractual obligations thereof; (iii) processing is necessary for compliance with a legal obligation to which you are subject; (iv) processing is related to a task that is carried out in the public interest or in the
        exercise of official authority vested in us; (v) processing is necessary for the purposes of the legitimate interests pursued by us or by a third party.
      </Typography>
      <Typography>We rely on user’s consent and our own legitimate interests as legal bases as defined in the GDPR upon which we collect and process your Personal Information.</Typography>
      <Typography>
        Note that under some legislations we may be allowed to process information until you object to such processing by opting out, without having to rely on consent or any other of the legal bases above. In any case, we will be happy to clarify
        the specific legal basis that applies to the processing, and in particular whether the provision of Personal Information is a statutory or contractual requirement, or a requirement necessary to enter into a contract.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Payment processing
      </Typography>
      <Typography>
        In case of Services requiring payment, you may need to provide your credit card details or other payment account information, which will be used solely for processing payments. We use third-party payment processors (“Payment Processors”) to
        assist us in processing your payment information securely.
      </Typography>
      <Typography>
        Payment Processors adhere to the latest security standards as managed by the PCI Security Standards Council, which is a joint effort of brands like Visa, MasterCard, American Express and Discover. Sensitive and private data exchange happens
        over a SSL secured communication channel and is encrypted and protected with digital signatures, and the Website and Services are also in compliance with strict vulnerability standards in order to create as secure of an environment as
        possible for Users. We will share payment data with the Payment Processors only to the extent necessary for the purposes of processing your payments, refunding such payments, and dealing with complaints and queries related to such payments
        and refunds.
      </Typography>
      <Typography>
        Please note that the Payment Processors may collect some Personal Information from you, which allows them to process your payments (e.g., your email address, address, credit card details, and bank account number) and handle all the steps in
        the payment process through their systems, including data collection and data processing. The Payment Processors’ use of your Personal Information is governed by their respective privacy policies which may or may not contain privacy
        protections as protective as this Policy. We suggest that you review their respective privacy policies.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Managing information
      </Typography>
      <Typography>
        You are able to delete certain Personal Information we have about you. The Personal Information you can delete may change as the Website and Services change. When you delete Personal Information, however, we may maintain a copy of the
        unrevised Personal Information in our records for the duration necessary to comply with our obligations to our affiliates and partners, and for the purposes described below. If you would like to delete your Personal Information or permanently
        delete your account, you can do so on the settings page of your account on the Website.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Disclosure of information
      </Typography>
      <Typography>
        Depending on the requested Services or as necessary to complete any transaction or provide any Service you have requested, we may share your information with our affiliates, contracted companies, and service providers (collectively, “Service
        Providers”) we rely upon to assist in the operation of the Website and Services available to you and whose privacy policies are consistent with ours or who agree to abide by our policies with respect to Personal Information. We will not share
        any information with unaffiliated third parties.
      </Typography>
      <Typography>
        Service Providers are not authorized to use or disclose your information except as necessary to perform services on our behalf or comply with legal requirements. Service Providers are given the information they need only in order to perform
        their designated functions, and we do not authorize them to use or disclose any of the provided information for their own marketing or other purposes. We will share and disclose your information only with the following categories of Service
        Providers:
      </Typography>
      <ol>
        <li>
          <Typography>- Cloud computing services</Typography>
        </li>
        <li>
          <Typography>- Data storage services</Typography>
        </li>
        <li>
          <Typography>- Payment processors</Typography>
        </li>
        <li>
          <Typography>- User authentication services</Typography>
        </li>
      </ol>
      <Typography>
        We may also disclose any Personal Information we collect, use or receive if required or permitted by law, such as to comply with a subpoena or similar legal process, and when we believe in good faith that disclosure is necessary to protect
        our rights, protect your safety or the safety of others, investigate fraud, or respond to a government request.
      </Typography>
      <Typography>
        In the event we go through a business transition, such as a merger or acquisition by another company, or sale of all or a portion of its assets, your user account, and your Personal Information will likely be among the assets transferred.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Retention of information
      </Typography>
      <Typography>
        We will retain and use your Personal Information for the period necessary to comply with our legal obligations, as long as your user account remains active, to enforce our Policy, resolve disputes, and unless a longer retention period is
        required or permitted by law.
      </Typography>
      <Typography>
        We may use any aggregated data derived from or incorporating your Personal Information after you update or delete it, but not in a manner that would identify you personally. Once the retention period expires, Personal Information shall be
        deleted. Therefore, the right to access, the right to erasure, the right to rectification, and the right to data portability cannot be enforced after the expiration of the retention period.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Transfer of information
      </Typography>
      <Typography>
        Depending on your location, data transfers may involve transferring and storing your information in a country other than your own, including USA. The transfer of your Personal Information to countries outside the European Union will be made
        only if you have explicitly consented to it or in the cases provided for by the GDPR and will be processed in your interest.
      </Typography>
      <Typography>
        You are entitled to learn about the legal basis of information transfers to a country outside the European Union or to any international organization governed by public international law or set up by two or more countries, such as the UN, and
        about the security measures taken by us to safeguard your information. If any such transfer takes place, you can find out more by checking the relevant sections of this Policy or inquire with us using the information provided in the contact
        section.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Data protection rights under the GDPR
      </Typography>
      <Typography>
        If you are a resident of the European Economic Area (“EEA”), you have certain data protection rights and we aim to take reasonable steps to allow you to correct, amend, delete, or limit the use of your Personal Information. If you wish to be
        informed what Personal Information we hold about you and if you want it to be removed from our systems, please contact us. In certain circumstances, you have the following data protection rights:
      </Typography>
      <ol>
        <li>
          <Typography>
            (i) You have the right to withdraw consent where you have previously given your consent to the processing of your Personal Information. To the extent that the legal basis for our processing of your Personal Information is consent, you
            have the right to withdraw that consent at any time. Withdrawal will not affect the lawfulness of processing before the withdrawal.
          </Typography>
        </li>
        <li>
          <Typography>
            (ii) You have the right to learn if your Personal Information is being processed by us, obtain disclosure regarding certain aspects of the processing, and obtain a copy of your Personal Information undergoing processing.
          </Typography>
        </li>
        <li>
          <Typography>(iii) You have the right to verify the accuracy of your information and ask for it to be updated or corrected. You also have the right to request us to complete the Personal Information you believe is incomplete.</Typography>
        </li>
        <li>
          <Typography>
            (iv) You have the right to object to the processing of your information if the processing is carried out on a legal basis other than consent. Where Personal Information is processed for the public interest, in the exercise of an official
            authority vested in us, or for the purposes of the legitimate interests pursued by us, you may object to such processing by providing a ground related to your particular situation to justify the objection.
          </Typography>
        </li>
        <li>
          <Typography>
            (v) You have the right, under certain circumstances, to restrict the processing of your Personal Information. These circumstances include: the accuracy of your Personal Information is contested by you and we must verify its accuracy; the
            processing is unlawful, but you oppose the erasure of your Personal Information and request the restriction of its use instead; we no longer need your Personal Information for the purposes of processing, but you require it to establish,
            exercise or defend your legal claims; you have objected to processing pending the verification of whether our legitimate grounds override your legitimate grounds. Where processing has been restricted, such Personal Information will be
            marked accordingly and, with the exception of storage, will be processed only with your consent or for the establishment, to exercise or defense of legal claims, for the protection of the rights of another natural, or legal person or for
            reasons of important public interest.
          </Typography>
        </li>
        <li>
          <Typography>
            (vi) You have the right, under certain circumstances, to obtain the erasure of your Personal Information from us. These circumstances include: the Personal Information is no longer necessary in relation to the purposes for which it was
            collected or otherwise processed; you withdraw consent to consent-based processing; you object to the processing under certain rules of applicable data protection law; the processing is for direct marketing purposes; and the personal data
            have been unlawfully processed. However, there are exclusions of the right to erasure such as where processing is necessary: for exercising the right of freedom of expression and information; for compliance with a legal obligation; or for
            the establishment, to exercise or defense of legal claims.
          </Typography>
        </li>
        <li>
          <Typography>
            (vii) You have the right to receive your Personal Information that you have provided to us in a structured, commonly used, and machine-readable format and, if technically feasible, to have it transmitted to another controller without any
            hindrance from us, provided that such transmission does not adversely affect the rights and freedoms of others.
          </Typography>
        </li>
        <li>
          <Typography>
            (viii) You have the right to complain to a data protection authority about our collection and use of your Personal Information. If you are not satisfied with the outcome of your complaint directly with us, you have the right to lodge a
            complaint with your local data protection authority. For more information, please contact your local data protection authority in the EEA. This provision is applicable provided that your Personal Information is processed by automated
            means and that the processing is based on your consent, on a contract which you are part of, or on pre-contractual obligations thereof.
          </Typography>
        </li>
      </ol>
      <Typography
        variant="h5"
        component="h2"
      >
        California privacy rights
      </Typography>
      <Typography>
        Consumers residing in California are afforded certain additional rights with respect to their Personal Information under the California Consumer Privacy Act (“CCPA”). If you are a California resident, this section applies to you.
      </Typography>
      <Typography>
        In addition to the rights as explained in this Policy, California residents who provide Personal Information as defined in the statute to obtain Services for personal, family, or household use are entitled to request and obtain from us, once
        a calendar year, information about the categories and specific pieces of Personal Information we have collected and disclosed.
      </Typography>
      <Typography>
        Furthermore, California residents have the right to request deletion of their Personal Information or opt-out of the sale of their Personal Information which may include selling, disclosing, or transferring Personal Information to another
        business or a third party for monetary or other valuable consideration. To do so, simply contact us. We will not discriminate against you if you exercise your rights under the CCPA.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        How to exercise your rights
      </Typography>
      <Typography>
        Any requests to exercise your rights can be directed to us through the contact details provided in this document. Please note that we may ask you to verify your identity before responding to such requests. Your request must provide sufficient
        information that allows us to verify that you are the person you are claiming to be or that you are the authorized representative of such person. If we receive your request from an authorized representative, we may request evidence that you
        have provided such an authorized representative with power of attorney or that the authorized representative otherwise has valid written authority to submit requests on your behalf.
      </Typography>
      <Typography>
        You must include sufficient details to allow us to properly understand the request and respond to it. We cannot respond to your request or provide you with Personal Information unless we first verify your identity or authority to make such a
        request and confirm that the Personal Information relates to you.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Cookies
      </Typography>
      <Typography>
        Our Website and Services use “cookies” to help personalize your online experience. A cookie is a text file that is placed on your hard disk by a web page server. Cookies cannot be used to run programs or deliver viruses to your computer.
        Cookies are uniquely assigned to you, and can only be read by a web server in the domain that issued the cookie to you. If you choose to decline cookies, you may not be able to fully experience the features of the Website and Services.
      </Typography>
      <Typography>
        We may use cookies to collect, store, and track information for security and personalization, to operate the Website and Services, and for statistical purposes. Please note that you have the ability to accept or decline cookies. Most web
        browsers automatically accept cookies by default, but you can modify your browser settings to decline cookies if you prefer.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Do Not Track signals
      </Typography>
      <Typography>
        Some browsers incorporate a Do Not Track feature that signals to websites you visit that you do not want to have your online activity tracked. Tracking is not the same as using or collecting information in connection with a website. For these
        purposes, tracking refers to collecting personally identifiable information from consumers who use or visit a website or online service as they move across different websites over time. How browsers communicate the Do Not Track signal is not
        yet uniform. As a result, the Website and Services are not yet set up to interpret or respond to Do Not Track signals communicated by your browser. Even so, as described in more detail throughout this Policy, we limit our use and collection
        of your Personal Information. For a description of Do Not Track protocols for browsers and mobile devices or to learn more about the choices available to you, visit{" "}
        <a
          className="underline"
          href="https://www.internetcookies.com/"
        >
          internetcookies.com
        </a>
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Links to other resources
      </Typography>
      <Typography>
        The Website and Services contain links to other resources that are not owned or controlled by us. Please be aware that we are not responsible for the privacy practices of such other resources or third parties. We encourage you to be aware
        when you leave the Website and Services and to read the privacy statements of each and every resource that may collect Personal Information.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Information security
      </Typography>
      <Typography>
        We secure information you provide on computer servers in a controlled, secure environment, protected from unauthorized access, use, or disclosure. We maintain reasonable administrative, technical, and physical safeguards in an effort to
        protect against unauthorized access, use, modification, and disclosure of Personal Information in our control and custody. However, no data transmission over the Internet or wireless network can be guaranteed.
      </Typography>
      <Typography>
        Therefore, while we strive to protect your Personal Information, you acknowledge that (i) there are security and privacy limitations of the Internet which are beyond our control; (ii) the security, integrity, and privacy of any and all
        information and data exchanged between you and the Website and Services cannot be guaranteed; and (iii) any such information and data may be viewed or tampered with in transit by a third party, despite best efforts.
      </Typography>
      <Typography>
        As the security of Personal Information depends in part on the security of the device you use to communicate with us and the security you use to protect your credentials, please take appropriate measures to protect this information.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Data breach
      </Typography>
      <Typography>
        In the event we become aware that the security of the Website and Services has been compromised or Users’ Personal Information has been disclosed to unrelated third parties as a result of external activity, including, but not limited to,
        security attacks or fraud, we reserve the right to take reasonably appropriate measures, including, but not limited to, investigation and reporting, as well as notification to and cooperation with law enforcement authorities. In the event of
        a data breach, we will make reasonable efforts to notify affected individuals if we believe that there is a reasonable risk of harm to the User as a result of the breach or if notice is otherwise required by law. When we do, we will send you
        an email.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Changes and amendments
      </Typography>
      <Typography>
        We reserve the right to modify this Policy or its terms related to the Website and Services at any time at our discretion. When we do, we will revise the updated date at the bottom of this page. We may also provide notice to you in other ways
        at our discretion, such as through the contact information you have provided.
      </Typography>
      <Typography>
        An updated version of this Policy will be effective immediately upon the posting of the revised Policy unless otherwise specified. Your continued use of the Website and Services after the effective date of the revised Policy (or such other
        act specified at that time) will constitute your consent to those changes. However, we will not, without your consent, use your Personal Information in a manner materially different than what was stated at the time your Personal Information
        was collected.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Acceptance of this policy
      </Typography>
      <Typography>
        You acknowledge that you have read this Policy and agree to all its terms and conditions. By accessing and using the Website and Services and submitting your information you agree to be bound by this Policy. If you do not agree to abide by
        the terms of this Policy, you are not authorized to access or use the Website and Services.
      </Typography>
      <Typography
        variant="h5"
        component="h2"
      >
        Contacting us
      </Typography>

      <Typography>If you have any questions regarding the information we may hold about you or if you wish to exercise your rights, you may use the following data subject request form to submit your request:</Typography>
      <Typography>
        <Link href="/dsar-form">Submit a data access request</Link>
      </Typography>
      <Typography>If you have any other questions, concerns, or complaints regarding this Policy, we encourage you to contact us using the details below:</Typography>

      <Typography>WeShouldWatchMailer@gmail.com</Typography>
      <Typography>
        We will attempt to resolve complaints and disputes and make every reasonable effort to honor your wish to exercise your rights as quickly as possible and in any event, within the timescales provided by applicable data protection laws.
      </Typography>
      <Typography>This document was last updated on August 18, 2023</Typography>
    </Container>
  );
};

export default PrivacyPage;
