import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common'

@Injectable()
export class UpdateHomeDetailsPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        let local_value = { ...value }

        if (local_value?.slug) {
            delete local_value?.slug
        }

        if (local_value?.price) {
            local_value.price = parseInt(local_value.price)
        }

        if (local_value?.area) {
            local_value.area = parseInt(local_value.area)
        }
        return local_value
    }
}
