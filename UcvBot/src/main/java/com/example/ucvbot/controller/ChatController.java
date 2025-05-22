package com.example.ucvbot.controller;

import com.example.ucvbot.dto.ChatSummaryDTO;
import com.example.ucvbot.model.Chat;
import com.example.ucvbot.services.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService v_chatService;

    @PostMapping
    public ResponseEntity<Chat> createChat(@RequestBody Chat chat) {
        Chat v_obj = v_chatService.saveChat(chat);
        return new ResponseEntity<>(v_obj, HttpStatus.CREATED);
    }

    @GetMapping
    public List<Chat> getAll() {
        return v_chatService.getAll();
    }

    @GetMapping("/chatSummary/{userUID}")
    public List<ChatSummaryDTO> getChatSummariesByUserUID(@PathVariable(value = "userUID") String userUID) {
        return v_chatService.getChatSummariesByUserUID(userUID);
    }

    @GetMapping("/userWithTheMostChats")
    public String userWithTheMostChats() {
        return v_chatService.userWithTheMostChats();
    }

    ;

    @GetMapping("/mostFrequentTitles")
    public ResponseEntity<List<Object[]>> findMostFrequentTitlesWithPercentage() {
        return new ResponseEntity<>(v_chatService.findMostFrequentTitlesWithPercentage(), HttpStatus.OK);
    }

    @GetMapping("/numberOfMessagesPerUsers")
    public List<Object[]> numberOfMessagesPerUsers() {
        return v_chatService.numberOfMessagesPerUsers();
    }

    ;

    @GetMapping("/numberOfChats")
    public String numberOfChats() {
        return v_chatService.numberOfChats();
    }

    @GetMapping("/averageResponseTime")
    public String averageResponseTime() {
        return v_chatService.averageResponseTime();
    }

    @GetMapping("/longerTalkTime")
    public String longerTalkTime() {
        return v_chatService.longerTalkTime();
    }
}
