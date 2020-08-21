const Yup = require('yup')

const packageValidation = async (data, method) => {
  if (method === 'POST' || method === 'PUT') {
    await Yup.object()
    .shape({
      customer_name: Yup.string().required(),
      customer_code: Yup.string().required(),
      transaction_amount: Yup.string().required(),
      transaction_discount: Yup.string().nullable(),
      transaction_additional_field: Yup.string().nullable(),
      transaction_payment_type: Yup.string().required(),
      transaction_state: Yup.string().required(),
      transaction_code: Yup.string().required(),
      transaction_order: Yup.number().min(0).default(0),
      organization_id: Yup.number().min(1).required(),
      transaction_payment_type_name: Yup.string().required(),
      transaction_cash_amount: Yup.number().min(0).default(0),
      transaction_cash_change: Yup.number().min(0).default(0),
      customer_attribute: Yup.object(),
      connote: Yup.object()
        .shape({
          connote_number: Yup.number().min(0).required(),
          connote_service: Yup.string().required(),
          connote_service_price: Yup.number().min(0).default(0),
          connote_amount: Yup.number().min(0).default(0),
          connote_code: Yup.string().required(),
          connote_booking_code: Yup.string().nullable(),
          connote_order: Yup.number().required(),
          connote_state: Yup.string().required(),
          connote_state_id: Yup.number().min(1).required(),
          zone_code_from: Yup.string().required(),
          zone_code_to: Yup.string().required(),
          surcharge_amount: Yup.number().nullable(),
          actual_weight: Yup.number().min(0).default(0),
          volume_weight: Yup.number().min(0).default(0),
          chargeable_weight: Yup.number().min(0).default(0),
          organization_id: Yup.number().min(1).required(),
          connote_total_package: Yup.string().required(),
          connote_surcharge_amount: Yup.string().required(),
          connote_sla_day: Yup.string().required(),
          location_name: Yup.string().required(),
          location_type: Yup.string().required(),
          source_tariff_db: Yup.string().required(),
          id_source_tariff: Yup.string().required(),
          pod: Yup.number().nullable(),
          history: Yup.array()
        }).required(),
      origin_data: Yup.object()
        .shape({
          customer_name: Yup.string().required(),
          customer_address: Yup.string().required(),
          customer_email: Yup.string().required(),
          customer_phone: Yup.string().required(),
          customer_address_detail: Yup.string().nullable(),
          customer_zip_code: Yup.string().required(),
          zone_code: Yup.string().required(),
          organization_id: Yup.number().min(1).required()
        }).required(),
      destination_data: Yup.object()
        .shape({
          customer_name: Yup.string().required(),
          customer_address: Yup.string().required(),
          customer_email: Yup.string().nullable(),
          customer_phone: Yup.string().required(),
          customer_address_detail: Yup.string().required(),
          customer_zip_code: Yup.string().required(),
          zone_code: Yup.string().required(),
          organization_id: Yup.number().min(1).required()
        }).required(),
      koli_data: Yup.array().of(
        Yup.object().shape({
          koli_length: Yup.number().min(0).default(0),
          awb_url: Yup.string().required(),
          koli_chargeable_weight: Yup.number().min(0).default(0),
          koli_width: Yup.number().min(0).default(0),
          koli_surcharge: Yup.array().nullable(),
          koli_height: Yup.number().min(0).default(0),
          koli_description: Yup.string().nullable(),
          koli_formula_id: Yup.string().nullable(),
          koli_volume: Yup.number().min(0).default(0),
          koli_weight: Yup.number().min(0).default(0),
          koli_custom_field: Yup.object().required(),
          koli_code: Yup.string().required(),
        })
      ),
      custom_field: Yup.object(),
      currentLocation: Yup.object()
        .shape({
          name: Yup.string().required(),
          code: Yup.string().required(),
          type: Yup.string().required(),
        }).required()
    })
    .validate(data, {
      abortEarly: false, strict: true
    });
  } else {
    await Yup.object()
    .shape({
      customer_name: Yup.string(),
      customer_code: Yup.string(),
      transaction_amount: Yup.string(),
      transaction_discount: Yup.string(),
      transaction_additional_field: Yup.string(),
      transaction_payment_type: Yup.string(),
      transaction_state: Yup.string(),
      transaction_code: Yup.string(),
      transaction_order: Yup.number().min(0).default(0),
      organization_id: Yup.number().min(1),
      transaction_payment_type_name: Yup.string(),
      transaction_cash_amount: Yup.number().min(0).default(0),
      transaction_cash_change: Yup.number().min(0).default(0),
      customer_attribute: Yup.object(),
      connote: Yup.object()
        .shape({
          connote_number: Yup.number().min(0),
          connote_service: Yup.string(),
          connote_service_price: Yup.number().min(0).default(0),
          connote_amount: Yup.number().min(0).default(0),
          connote_code: Yup.string(),
          connote_booking_code: Yup.string(),
          connote_order: Yup.number(),
          connote_state: Yup.string(),
          connote_state_id: Yup.number().min(1),
          zone_code_from: Yup.string(),
          zone_code_to: Yup.string(),
          surcharge_amount: Yup.number(),
          actual_weight: Yup.number().min(0).default(0),
          volume_weight: Yup.number().min(0).default(0),
          chargeable_weight: Yup.number().min(0).default(0),
          organization_id: Yup.number().min(1),
          connote_total_package: Yup.string(),
          connote_surcharge_amount: Yup.string(),
          connote_sla_day: Yup.string(),
          location_name: Yup.string(),
          location_type: Yup.string(),
          source_tariff_db: Yup.string(),
          id_source_tariff: Yup.string(),
          pod: Yup.number(),
          history: Yup.array()
        }),
      origin_data: Yup.object()
        .shape({
          customer_name: Yup.string(),
          customer_address: Yup.string(),
          customer_email: Yup.string(),
          customer_phone: Yup.string(),
          customer_address_detail: Yup.string(),
          customer_zip_code: Yup.string(),
          zone_code: Yup.string(),
          organization_id: Yup.number().min(1)
        }),
      destination_data: Yup.object()
        .shape({
          customer_name: Yup.string(),
          customer_address: Yup.string(),
          customer_email: Yup.string(),
          customer_phone: Yup.string(),
          customer_address_detail: Yup.string(),
          customer_zip_code: Yup.string(),
          zone_code: Yup.string(),
          organization_id: Yup.number().min(1)
        }),
      koli_data: Yup.array().of(
        Yup.object().shape({
          koli_length: Yup.number().min(0).default(0),
          awb_url: Yup.string(),
          koli_chargeable_weight: Yup.number().min(0).default(0),
          koli_width: Yup.number().min(0).default(0),
          koli_surcharge: Yup.array(),
          koli_height: Yup.number().min(0).default(0),
          koli_description: Yup.string(),
          koli_formula_id: Yup.string(),
          koli_volume: Yup.number().min(0).default(0),
          koli_weight: Yup.number().min(0).default(0),
          koli_custom_field: Yup.object(),
          koli_code: Yup.string(),
        })
      ),
      custom_field: Yup.object(),
      currentLocation: Yup.object()
        .shape({
          name: Yup.string(),
          code: Yup.string(),
          type: Yup.string(),
        })
    })
    .validate(data, {
      abortEarly: false, strict: true
    });
  }
}
const validateError = (e, res) => {
  const errors = {}
  e.inner.forEach(item => {
    errors[item.path] = item.message
  })

  console.log('res', errors)

  res.status(422).json({
    errors
  })

  if (Object.keys(errors).length > 0) {
    return false
  }

  return true
}

module.exports = {
  validateError,
  packageValidation
}