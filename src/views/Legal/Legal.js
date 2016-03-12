/* @flow */
import React from 'react'
import s from './Legal.scss'
import Header from '../../components/Header/Header.js'
import Footer from '../../components/Footer/Footer.js'
import ReactDOM from 'react-dom'
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
export class Legal extends React.Component {

  static propTypes = {
    route: React.PropTypes.object.isRequired
  };

  componentDidMount () {
    ReactDOM.findDOMNode(this).scrollIntoView()
  }

  render () {
    return (
      <div className={s.root}>
        <Header fixed={false} home route={this.props.route}/>
        <div className={s.fakeunder}></div>
        <div className={s.container}>
          <span className={s.title}>"How is this Legal?"</span>
          <span className={s.welcome}>Fantasy Pollster is in compliance with the Unlawful Internet Gambling Enforcement Act of 2006. The law states, in section 5362(1)(E)(ix), that a bet or wager does not include:</span>
          <span className={s.letter}>participation in any fantasy or simulation sports game or educational game or contest in which (if the game or contest involves a team or teams) no fantasy or simulation sports team is based on the current membership of an actual team that is a member of an amateur or professional sports organization (as those terms are defined in section 3701 of title 28) and that meets the following conditions:</span>
          <span className={s.letter}>‘‘(I) All prizes and awards offered to winning participants are established and

          made known to the participants in advance of the game or contest and their

          value is not determined by the number of participants or the amount of any fees

          paid by those participants.</span>
          <span className={s.letter}>‘‘(II) All winning outcomes reflect the relative knowledge and skill of the

          participants and are determined predominantly by accumulated statistical results

          of the performance of individuals (athletes in the case of sports events) in

          multiple real-world sporting or other events.</span>
          <span className={s.letter}>‘‘(III) No winning outcome is based—</span>
          <span className={s.subletter}>‘‘(aa) on the score, point-spread, or any performance or performances of any single real-world team or any combination of such teams; or</span>
          <span className={s.subletter}>‘‘(bb) solely on any single performance of
          an individual athlete in any single real-world
          sporting or other event.</span>
          <span className={s.welcome}>To satisfy this law, it is clear that Fantasy Pollster can be considered an educational game or contest. There is a strong precedent for non-sports related games and contests to qualify under this section.</span>
          <span className={s.welcome}>Further, prizes are fixed for each game, independent of amount of participants or the fees they have paid. For example, imagine a game with an entry fee of $10 and a capacity of 10 players. If 10 participants joined the game, the total prize would be the same as if 9 people joined the game. Similarly, although our fees are usually fixed. If some players paid $9, instead of $10, the prize, still, would not change.</span>
          <span className={s.welcome}>The outcomes of these games are based on the skill and relative knowledge of the participants. It is based on the relative knowledge, because a player who correctly determines the winning politician will beat a player who does not. It is also a game of skill because, in order to determine the correct prediction, a player must engage in statistics and political polling— which is a well-regarded profession and rigorously studied academic field.</span>
          <span className={s.welcome}>Our games are based on the accumulated statistics of multiple events because each statewide and national election can be broken down into subsidiary events. A statewide election is really just a collection of multiple local precinct/county elections. Nationwide elections consist of even more events because they are comprised of the local elections from each precinct/county in each state.</span>
          <span className={s.welcome}>Lastly, some clauses in this law do not apply to Fantasy Pollster because we are not a sports-related website. Our events have no relation to the performance of athletes or sports teams.</span>
          <span className={s.welcome}>Although Fantasy Pollster is in compliance with federal law, there are some states in which we are not allowed to operate. Please check the <a href='/terms'>Terms of Use</a> for an up-to-date list of such states.</span>
        </div>
        <Footer/>
      </div>
    )
  }
}

export default Legal
