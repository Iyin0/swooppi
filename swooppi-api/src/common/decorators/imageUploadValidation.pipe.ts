import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { ResponseUtils } from "../utils/response.utils";

@Injectable()
export class ImageUploadValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {

        const formats = ['JPEG', 'JPG', 'PNG', 'JFIF']
        console.log(value)

        // Object.keys(value).forEach(key => {
        //     if (key === 'produc_images') {
        //         if (value[key].length > 1) {
        //             throw new BadRequestException(ResponseUtils.serverResponse(
        //                 false, HttpStatus.BAD_REQUEST,
        //                 `Only 1 product image is required`
        //             ))
        //         }
        //     }

        //     value[key].forEach((item: any, index: number) => {
        //         if (item.size > 5 * 1024 * 1024) {
        //             throw new BadRequestException(ResponseUtils.serverResponse(
        //                 false, HttpStatus.BAD_REQUEST,
        //                 `Error uploading image: Image ${index + 1} in field '${item.fieldname}' too large. Maximum image size is 5MB`
        //             ))
        //         }
        //         if (!formats.includes(item.mimetype.toUpperCase().split('/')[1])) {
        //             throw new BadRequestException(ResponseUtils.serverResponse(
        //                 false, HttpStatus.BAD_REQUEST,
        //                 `Error uploading image: Image ${index + 1} in field '${item.fieldname}' format is unsupported. Expected image formats are 'JPEG', 'JPG' and 'PNG'`
        //             ))
        //         }
        //     })
        // })

        return value
    }
}