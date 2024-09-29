import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContactDto } from './dto/createContact.dto';
import { AddNoteDto } from './dto/addNote.dto';
import { NotificationService } from '../notification/notification.service';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly notificationService: NotificationService,
  ) {}

  async createContact(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = this.contactRepository.create(createContactDto);

    // Формирование сообщения для отправки в Telegram
    const message = `Новый контакт:
    Имя: ${createContactDto.name}
    Email: ${createContactDto.email}
    Telegram: @${createContactDto.tg}
    Комментарий: ${createContactDto.comment}`;

    // Отправка сообщения в Telegram
    await this.notificationService.sendToTelegram(message);

    return await this.contactRepository.save(contact);
  }

  async getAllContacts(): Promise<Contact[]> {
    return await this.contactRepository.find();
  }

  async getContactById(id: number): Promise<Contact> {
    return await this.contactRepository.findOne({ where: { id } });
  }

  async deleteContactById(id: number): Promise<void> {
    await this.contactRepository.delete({ id });
  }

  async addNote(id: number, addNoteDto: AddNoteDto): Promise<void> {
    await this.contactRepository.update(id, { note: addNoteDto.note });
  }
}
