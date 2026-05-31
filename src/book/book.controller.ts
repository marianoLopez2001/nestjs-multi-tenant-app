import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from "@nestjs/common";
import { BookService } from "./book.service";
import { Book } from "../generated/prisma/client";
import { BookCreateInput } from "../generated/prisma/models";
import { anonymous } from "better-auth/plugins";
import { AllowAnonymous } from "@thallesp/nestjs-better-auth";

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