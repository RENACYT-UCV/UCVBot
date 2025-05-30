package com.example.ucvbot.repository;

import com.example.ucvbot.model.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {

    @Query("SELECT m FROM Message m WHERE m.v_chat.v_id = :chatId")
    List<Message> findMessagesByV_chat_Id(@Param("chatId") Long chatId);
}
