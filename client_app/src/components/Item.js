import React from 'react'
import { Grid, Card, Image, Divider, Message } from 'semantic-ui-react'
import UserItemAction from './personal/ItemAction'
import AdminItemAction from './admin/ItemAction'
import Rate from './rate/Rate'

export default class Item extends React.Component {
  render () {
    const {id, email, firstName, lastName, imageUrl, title, description, price, phone, type, province, city, available, store, promotion, score, deletedAt, userType, adType} = this.props.itemInfo
    const forSaleBy = `${firstName} ${lastName}`
    console.log(this.props.itemInfo)
    const forSaleByPersonal = `${this.props.firstName} ${this.props.lastName}`
    const {page, promotionSet, purchasePromotion, deleteItem, rateAd, editPost} = this.props
    const columnStyle = {paddingLeft: '1.5%', paddingRight: '1.5%', paddingBottom: 'inherit'}
    const cardStyle = {padding: '0px'}
    const myStyle = {
      display: 'inline-block',
      width: '100%',
      height: '400px',
      'backgroundRepeat': 'no-repeat',
      'backgroundPosition': 'center',
      'backgroundSize': 'contain',
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
            <div class='meta' style={{color: '#78909c'}}>Province: {province === undefined ? this.props.province : province} </div>
            <div class='meta' style={{color: '#78909c'}}>City: {city === undefined ? this.props.city : city} </div>
            <div class='meta' style={{color: '#78909c'}}>Phone number: {phone} </div>
          </div>
          <div class='content extra'>
            <span>For sale by: {`${firstName === undefined ? forSaleByPersonal : forSaleBy} - ${this.props.userType !== undefined ? this.props.userType : userType}`}</span>
            <br />
            <span> E-mail address: {email === undefined ? this.props.userEmail : email} </span>
            <br />
            <span>Ad type: {`${type} - ${adType}`}</span>
            <br />
            <br />
            {
              page === 'USER_PAGE'
              ? <UserItemAction promotionSet={promotionSet} editItem={editPost.bind(null, this.props.itemInfo)} deletedAt={deletedAt} deleteItem={deleteItem.bind(null, id)} available={available} purchasePromotion={purchasePromotion.bind(null)} itemId={id} promotion={promotion} sltype={store}/>
              : page === 'ADMIN_PAGE'
              ? <AdminItemAction deletedAt={deletedAt} deleteItem={deleteItem.bind(null, id)} />
              : type === 'Physical ad' && page !== 'USER_PAGE'
              ? <Rate adId={id} rateAd={rateAd.bind(null)} itemScore={score} />
              : null
            }
          </div>
        </div>
      </Grid.Column>
    )
  }
}
