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
        Chat chat = v_chatService.getChatById(chatId).orElseThrow(() -> new RuntimeException("Chat not found: " + chatId));

        Message message = new Message();
        message.setStatement(dto.getStatement());
        message.setRole(dto.getRole());
        message.setUnixTime(dto.getUnixTime());
        message.setChat(chat);

        if (dto.getAlternatives() != null && dto.getAnswer() != null && dto.getAnswered() != null) {
            dto.getAlternatives().forEach(alternative -> alternative.setMessage(message));
            message.setAlternatives(dto.getAlternatives());
            message.setAnswer(dto.getAnswer());
            message.setAnswered(dto.getAnswered());
        }

        chat.getMessages().add(message);
//        v_chatService.saveChat(chat);

        return v_messageRepository.save(message);
    }

    public Message update(Message dto, Long id) {
        Message message = v_messageRepository.findById(id).orElseThrow(() -> new RuntimeException("ID NOT FOUND: " + id));
        dto.setChat(message.getChat());
        return v_messageRepository.save(dto);
    }

    public List<Message> getMessagesByChat(Long chatId) {
        return v_messageRepository.findMessagesByChat_Id(chatId);
    }

}
