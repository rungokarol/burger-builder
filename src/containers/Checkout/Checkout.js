import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CheckoutSummary from './../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends React.Component {
  checkoutCanceledHandler = () => {
    this.props.history.goBack()
  }

  checkoutContinuedHandler = () => {
    console.log(this.props)
    this.props.history.replace({
      pathname: `${this.props.match.url}/contact-data`
    })
  }

  render() {

    let summary = <Redirect to='/' />

    if (this.props.ingredients) {
      const purchasedRedirect = this.props.purchased ? <Redirect to='/' /> : null

      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCanceled={this.checkoutCanceledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          <Route
            path={`${this.props.match.url}/contact-data`}
            component={ContactData} />
        </div>
    )}
    return summary
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
  }
}

export default connect(mapStateToProps)(Checkout)
