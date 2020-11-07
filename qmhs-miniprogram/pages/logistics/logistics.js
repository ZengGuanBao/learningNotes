import create from '../../store/create'
import store from '../../store/store'
import {imgHost} from '../../config/index'

create(store, {
  data: {
    imgHost,
    deliveryCompany: '',
    deliverySn: '',
    deliveryList: []
  },
  onLoad(options) {
    this.setData({
      deliveryList: JSON.parse(options.info),
      deliveryCompany: options.deliveryCompany,
      deliverySn: options.deliverySn,
    })
  },
})
