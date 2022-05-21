import { Schema, model } from 'mongoose'

import { Organization } from '../../../modules/accounts/domain/Organization'

const OrganizationSchema = new Schema<Organization>(
  {
    name: {
      type: String,
      required: true
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
)

const OrganizationModel = model<Organization>(
  'Organization',
  OrganizationSchema,
  'organizations'
)

export { OrganizationModel }
