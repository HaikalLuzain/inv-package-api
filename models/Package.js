const mongoose = require('mongoose')
const uuid = require('uuid')

const Schema = mongoose.Schema
const model = mongoose.model

const KoliDataSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid.v4
    },
    koli_id: {
      type: String,
      default: uuid.v4
    },
    koli_length: {
      type: Number
    },
    awb_url: {
      type: String
    },
    koli_chargeable_weight: {
      type: Number
    },
    koli_width: {
      type: Number
    },
    koli_surcharge: {
      type: Array
    },
    koli_height: {
      type: Number
    },
    koli_description: {
      type: String
    },
    koli_formula_id: {
      type: String
    },
    connote_id: {
      type: String,
    },
    koli_volume: {
      type: Number
    },
    koli_weight: {
      type: Number
    },
    koli_custom_field: {
      type: Object
    },
    koli_code: {
      type: String
    },   
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

const ConnoteSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid.v4
    },
    connote_id: {
      type: String,
      default: uuid.v4
    },
    connote_number: {
      type: Number
    },
    connote_service: {
      type: String
    },
    connote_service_price: {
      type: Number
    },
    connote_amount: {
      type: Number
    },
    connote_code: {
      type: String
    },
    connote_booking_code: {
      type: String
    },
    connote_order: {
      type: Number
    },
    connote_state: {
      type: String
    },
    connote_state_id: {
      type: Number
    },
    zone_code_from: {
      type: String
    },
    zone_code_to: {
      type: String
    },
    surcharge_amount: {
      type: String
    },
    transaction_id: {
      type: String
    },
    actual_weight: {
      type: Number
    },
    volume_weight: {
      type: Number
    },
    chargeable_weight: {
      type: Number
    },
    organization_id: {
      type: Number
    },
    location_id: {
      type: String
    },
    connote_total_package: {
      type: String
    },
    connote_surcharge_amount: {
      type: String
    },
    connote_sla_day: {
      type: String
    },
    location_name: {
      type: String
    },
    location_type: {
      type: String
    },
    source_tariff_db: {
      type: String
    },
    id_source_tariff: {
      type: String
    },
    pod: {
      type: String
    },
    history: {
      type: Array
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

)

const PackageSchema = new Schema(
  {
    _id: {
      type: String,
      default: uuid.v4
    },
    transaction_id: {
      type: String,
      default: uuid.v4
    },
    customer_name: {
      type: String
    },
    customer_code: {
      type: String
    },
    transaction_amount: {
      type: String
    },
    transaction_discount: {
      type: String
    },
    transaction_additional_field: {
      type: String
    },
    transaction_payment_type: {
      type: String
    },
    transaction_state: {
      type: String
    },
    transaction_code: {
      type: String
    },
    transaction_order: {
      type: Number
    },
    location_id: {
      type: String
    },
    organization_id: {
      type: Number
    },
    transaction_payment_type_name: {
      type: String
    },
    transaction_cash_amount: {
      type: Number
    },
    transaction_cash_change: {
      type: Number
    },
    customer_attribute: {
      type: Object
    },
    connote: ConnoteSchema,
    connote_id: {
      type: String
    },
    origin_data: {
      customer_name: {
        type: String
      },
      customer_address: {
        type: String
      },
      customer_email: {
        type: String
      },
      customer_phone: {
        type: String
      },
      customer_address_detail: {
        type: String
      },
      customer_zip_code: {
        type: String
      },
      zone_code: {
        type: String
      },
      organization_id: {
        type: Number
      },
      location_id: {
        type: String
      }
    },
    destination_data: {
      customer_name: {
        type: String
      },
      customer_address: {
        type: String
      },
      customer_email: {
        type: String
      },
      customer_phone: {
        type: String
      },
      customer_address_detail: {
        type: String
      },
      customer_zip_code: {
        type: String
      },
      zone_code: {
        type: String
      },
      organization_id: {
        type: Number
      },
      location_id: {
        type: String
      }
    },
    koli_data: [KoliDataSchema],
    custom_field: {
      type: Object
    },
    currentLocation: {
      name: {
        type: String
      },
      code: {
        type: String
      },
      type: {
        type: String
      }
    }
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
)

// PackageSchema.pre('save', function (next) {
//   this.
// })

const PackageModel = mongoose.models.Package ||
model('Package', PackageSchema)

module.exports = PackageModel