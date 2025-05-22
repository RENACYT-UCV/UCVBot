package com.example.ucvbot.services;

import com.example.ucvbot.dto.ChatSummaryDTO;
import com.example.ucvbot.model.Chat;
import com.example.ucvbot.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRepository v_chatRepository;

    public Optional<Chat> getChatById(Long id) {
        return v_chatRepository.findById(id);
    }

    public Chat saveChat(Chat chat) {
        return v_chatRepository.save(chat);
    }

    public List<Chat> getAll() {
        return v_chatRepository.findAll();
    }

    public List<ChatSummaryDTO> getChatSummariesByUserUID(String userUID) {
        return v_chatRepository.findChatSummariesByUserUID(userUID);
    }

    public String userWithTheMostChats(){
        return v_chatRepository.userWithTheMostChats();
    }

    public List<Object[]> findMostFrequentTitlesWithPercentage(){
        return  v_chatRepository.findMostFrequentTitlesWithPercentage();
    };

    public List<Object[]> numberOfMessagesPerUsers(){
        return v_chatRepository.numberOfMessagesPerUsers();
    };

    public String numberOfChats(){
        return v_chatRepository.numberOfChats();
    }

    public String averageResponseTime(){
        return v_chatRepository.averageResponseTime();
    }

    public String longerTalkTime(){
        return v_chatRepository.longerTalkTime();
    }
}
