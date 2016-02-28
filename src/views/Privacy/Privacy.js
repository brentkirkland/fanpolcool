/* @flow */
import React from 'react'
import s from './Privacy.scss'
// We can use Flow (http://flowtype.org/) to type our component's props
// and state. For convenience we've included both regular propTypes and
// Flow types, but if you want to try just using Flow you'll want to
// disable the eslint rule `react/prop-types`.
// NOTE: You can run `npm run flow:check` to check for any errors in your
// code, or `npm i -g flow-bin` to have access to the binary globally.
// Sorry Windows users :(.

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export class Privacy extends React.Component {

  render () {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <span className={s.title}>Privacy Policy</span>
          <span className={s.effective}>Effective as of February 20, 2016</span>
          <span className={s.welcome}>FantasyPollster.com (the "<b>Site</b>") and its owner, Livv, Inc. ("<b>Company</b>", "<b>us</b>", "<b>our</b>", or "<b>we</b>"), value your privacy and security and provide this Privacy Policy (the "<b>Privacy Policy</b>") to describe the ways in which we use, share, and store your personally identifiable information ("<b>PII</b>"). Our Privacy Policy may be modified or replaced at any time. After any modification or replacement, users with registered Accounts will be sent email notification. Your continued use of the Site after such a change will constitute your consent to be bound by the new Terms.</span>
          <span className={s.bold}>What we collect.</span>
          <span className={s.effective}>We may collect the following information from our users at various points throughout the Site:</span>
          <span className={s.bullet}>&bull; &emsp; your contact information, including your name, email address, phone number, and other information you provide during Account registration;</span>
          <span className={s.bullet}>&bull; &emsp; information about your computer or mobile device, including your geographic location (including real-time data through use of your device's GPS or location  services, if available);</span>
          <span className={s.bullet}>&bull; &emsp; your demographic information, as provided;</span>
          <span className={s.bullet}>&bull; &emsp; your IP address;</span>
          <span className={s.bullet}>&bull; &emsp; your payment information; and</span>
          <span className={s.bullet}>&bull; &emsp; information about your predictions and contests your enter.</span>
          <span className={s.bold}>What we do with the information we collect.</span>
          <span className={s.effective}>We utilize PII to run the Site, facilitate our contests, and provide certain data to third parties. In particular, we may use your PII to:</span>
          <span className={s.bullet}>&bull; &emsp; create a user account for you to access the Site;</span>
          <span className={s.bullet}>&bull; &emsp; administrate contests, collect payments from you, and pay you for winning contests;</span>
          <span className={s.bullet}>&bull; &emsp; respond to questions and communications from you;</span>
          <span className={s.bullet}>&bull; &emsp; provide your information, in the aggregate, to our third party partners for marketing, administrative, or promotional purposes;</span>
          <span className={s.bullet}>&bull; &emsp; provide anonymized data (with PII removed) to political campaigns, organizations, and other third parties;</span>
          <span className={s.bullet}>&bull; &emsp; send promotional and administrative emails and text messages regarding our Site or other services of the Company, its affiliates, or third parties; and</span>
          <span className={s.bullet}>&bull; &emsp; use the information to optimize and improve the Site and the contests. </span>
          <span className={s.bold}>Children under 13 years of age.</span>
          <span className={s.effective}>You must be at least 18 years of age or older to create an account on the Site. Further, we do not knowingly collect any information from children under 13 years of age. If you believe we have information about a child under 13, please contact us immediately.</span>
          <span className={s.bold}>How we use cookies and GPS.</span>
          <span className={s.effective}>The Site we may place one or more cookies (small files) on your computer and mobile device. These cookies are designed to optimize your experience with the Site, and may also collect information about your use of the Site. We also use standard web tracking technology, such as web beacons, to assist us in administrating the Site.</span>
          <span className={s.effective}>Third parties, including advertisers, may also use certain data collected by our cookies to display relevant advertisements.</span>
          <span className={s.effective}>Cookies help us provide you with a better in-Site experience. A cookie in no way gives us access to your computer or any information about you, other than the data you choose to share with us. </span>
          <span className={s.effective}>You can choose to accept or decline cookies. Most mobile devices automatically accept cookies, but you can usually disable this feature through your device's settings. However, this may prevent you from taking full advantage of the Site.</span>
          <span className={s.effective}>We also use your mobile device's GPS or geolocation services to optimize your experience with the Site. We may store, organize, and analyze this data. We may share this data with other users and third parties.</span>
          <span className={s.bold}>Security.</span>
          <span className={s.effective}>We value the security of our users and have taken measures to limit unauthorized account access and data breaches. To accomplish this, we have put in place various procedures to safeguard and protect the information we collect from users. Nevertheless, it is impossible to guarantee the security of our Site or data. </span>
          <span className={s.effective}>We cannot guarantee that information you send to the Site won't be intercepted while being transmitted to us. Any information you transmit to the Site is transmitted at your own ris</span>
          <span className={s.bold}>Links to other websites.</span>
          <span className={s.effective}>Our Site may contain links to third party websites or applications. We have no control over these third party websites or applications and are in no way responsible for the protection and privacy of any information which you provide to such websites and applications. Please exercise caution when accessing any link on the Site</span>
          <span className={s.bold}>Contact us.</span>
          <span className={s.effective}>If you believe that any information we have is inaccurate or incomplete, or simply wish to contact us with questions about this Privacy Policy, please email us at support@fantasypollster.com </span>
        </div>
      </div>
    )
  }
}

export default Privacy
