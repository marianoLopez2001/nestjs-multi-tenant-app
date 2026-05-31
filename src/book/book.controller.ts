import { Body, Controller, Delete, Get, Param,  Post, Query } from "@nestjs/common";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";
import { BookService } from "./book.service";
import { BookCreateInput } from "@/prisma/generated/models";

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Get()
    @AllowAnonymous()
    getBooks(@Query() params: Params) {
        return this.bookService.getBooks(params)
    }

    @Get(':id')
    @AllowAnonymous()
    getBook(@Param('id') id: string, @Query() params: Params) {
        return this.bookService.getBook(id, params)
    }

    @Post()
    postBook(@Body() body: BookCreateInput) {
        return this.bookService.postBook(body)
    }

    @Delete(':id')
    deleteBook(@Param() id: string) {
        return this.bookService.deleteBook(id)
    }

    //update
}