import React from 'react'
import { Grid, Card, Image, Divider, Message } from 'semantic-ui-react'
import UserItemAction from './personal/ItemAction'
import AdminItemAction from './admin/ItemAction'
import Rate from './rate/Rate'

export default class Item extends React.Component {
  render () {
    const handleErrorMessage = (error, message) => {
      console.log('error', error)
      if (error) {
        return (
          <Message
            negative
            content={error}
          />
        )
      } else if (message) {
        return (
          <Message
            positive
            content={error}
        />
        )
      }
    }
    const {id, email, firstName, lastName, imageUrl, title, description, price, postDate, completed, phone, type, province, city, available, promotion, score} = this.props.itemInfo
    const forSaleBy = `${firstName} ${lastName}`
    const {page, promotionSet, purchasePromotion, deleteItem, rateAd} = this.props
    console.log(this.props)
    const columnStyle = {paddingLeft: '1.5%', paddingRight: '1.5%', paddingBottom: '1%'}
    const cardStyle = {padding: '0px'}
    const myStyle = {
      display: 'inline-block',
      width: '100%',
      height: '400px',
      'backgroundPosition': 'center center',
      'backgroundSize': 'cover',
      'backgroundImage': `url(${imageUrl})`
    }

    return (
      <Grid.Column stretched style={columnStyle}>
        <div class='ui card col s12 fluid' style={cardStyle}>
          <div style={myStyle} />
          <div class='content'>
            <div class='header'>{title}</div>
            <div class='description'>{description}</div>
            <Divider horizontal hidden />
            <div class='meta' style={{color: '#78909c'}}>Price: {`${price} CAD`}</div>
            <div class='meta' style={{color: '#78909c'}}>Province: {province} </div>
            <div class='meta' style={{color: '#78909c'}}>City: {city} </div>
            <div class='meta' style={{color: '#78909c'}}>Phone number: {phone} </div>
          </div>
          <div class='content extra'>
            <span>Status: </span><span>{completed ? 'Sold' : 'Available'}</span>
            <br />
            <span>For sale by: {forSaleBy}</span>
            <br />
            <span> E-mail address: {email} </span>
            <br />
            <span>Ad type: {type}</span>
            <br />
            {
              page === 'USER_PAGE'
              ? <UserItemAction promotionSet={promotionSet} deleteItem={deleteItem.bind(null, id)} available={available} purchasePromotion={purchasePromotion.bind(null)} itemId={id} promotion={promotion} />
              : page === 'ADMIN_PAGE'
              ? <AdminItemAction />
              : type === 'PHYSICAL_AD'
              ? <Rate adId={id} rateAd={rateAd.bind(null)} itemScore={score} />
              : <div />
            }
            {handleErrorMessage(this.props.error, this.props.message)}
          </div>
        </div>
      </Grid.Column>
    )
  }
}
