package com.example.ucvbot.services;

import com.example.ucvbot.model.Chat;
import com.example.ucvbot.model.Message;
import com.example.ucvbot.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository v_messageRepository;

    private final ChatService v_chatService;

    public Message addMessageToChat(Long chatId, Message dto) {
        Chat chat = v_chatService.getChatById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat not found: " + chatId));

        Message message = new Message();
        message.setV_statement(dto.getV_statement());
        message.setV_role(dto.getV_role());
        message.setV_unixTime(dto.getV_unixTime());
        message.setV_chat(chat);

        if (dto.getV_alternatives() != null && dto.getV_answer() != null && dto.getV_answered() != null) {
            dto.getV_alternatives().forEach(alternative -> alternative.setV_message(message));
            message.setV_alternatives(dto.getV_alternatives());
            message.setV_answer(dto.getV_answer());
            message.setV_answered(dto.getV_answered());
        }

        chat.getV_messages().add(message);
        // v_chatService.saveChat(chat);

        return v_messageRepository.save(message);
    }

    public Message update(Message dto, Long id) {
        Message message = v_messageRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ID NOT FOUND: " + id));
        dto.setV_chat(message.getV_chat());
        return v_messageRepository.save(dto);
    }

    public List<Message> getMessagesByChat(Long chatId) {
        return v_messageRepository.findMessagesByV_chat_Id(chatId);
    }

}
