import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/createContact.dto';
import { AddNoteDto } from './dto/addNote.dto';
import { AuthGuard } from '@nestjs/passport';
import { Contact } from './entities/contact.entity';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async createContact(
    @Body() createContactDto: CreateContactDto,
  ): Promise<Contact> {
    return await this.contactsService.createContact(createContactDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllContacts(): Promise<Contact[]> {
    return await this.contactsService.getAllContacts();
  }
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getContactById(@Param('id') id: number): Promise<Contact> {
    return await this.contactsService.getContactById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteContactById(@Param('id') id: number): Promise<void> {
    await this.contactsService.deleteContactById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/note')
  async addNote(
    @Param('id') id: number,
    @Body() addNoteDto: AddNoteDto,
  ): Promise<void> {
    await this.contactsService.addNote(id, addNoteDto);
  }
}
