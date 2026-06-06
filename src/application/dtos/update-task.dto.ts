import { IsNotEmpty, IsString, Length } from 'class-validator'

export class UpdateTaskDto {
    @Length(5, 50)
    @IsString()
    @IsNotEmpty()
    title: string
}
