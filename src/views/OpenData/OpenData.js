/* @flow */
import React from 'react'
import s from './OpenData.scss'
import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
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
export class OpenData extends React.Component {

  static propTypes = {
    route: React.PropTypes.object.isRequired
  };

  render () {
    return (
      <div className={s.root}>
        <Header fixed={false} home route={this.props.route}/>
        <div className={s.fakeunder}></div>
        <div className={s.container}>
          <span className={s.weknow2}>
            Coming soon.
          </span>
        </div>
        <Footer />
      </div>
    )
  }
}

export default OpenData
