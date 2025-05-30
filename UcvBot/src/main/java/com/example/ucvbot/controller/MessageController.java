package com.example.ucvbot.controller;

import com.example.ucvbot.model.Message;
import com.example.ucvbot.services.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/messages")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService v_messageService;

    @PostMapping("/chat/{chatId}")
    public ResponseEntity<Message> addMessage(@PathVariable Long chatId, @RequestBody Message obj) {
        Message v_message = v_messageService.addMessageToChat(chatId, obj);
        return new ResponseEntity<>(v_message, HttpStatus.CREATED);
    }

    @GetMapping("/chat/{chatId}")
    public ResponseEntity<List<Message>> getMessagesByChatId(@PathVariable Long chatId) {
        List<Message> list = v_messageService.getMessagesByChat(chatId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    private ResponseEntity<Message> update(@PathVariable("id") Long id, @RequestBody Message obj) throws Exception {
        obj.setV_id(id);
        Message v_message = v_messageService.update(obj, id);
        return new ResponseEntity<>(v_message, HttpStatus.OK);
    }
}
