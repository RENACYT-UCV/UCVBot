package com.example.ucvbot.repository;

import com.example.ucvbot.dto.ChatSummaryDTO;
import com.example.ucvbot.model.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ChatRepository extends JpaRepository<Chat, Long> {

//    @Query("SELECT new com.example.ucvbot.dto.ChatSummaryDTO(c.id, c.title, c.userUID) " +
//            "FROM Chat c WHERE c.userUID = :userUID")
//    List<ChatSummaryDTO> findChatSummariesByUserUID(@Param("userUID") String userUID);
//
//    @Query(value = "SELECT user_name FROM chat GROUP BY user_name, useruid ORDER BY COUNT(*) DESC LIMIT 1", nativeQuery = true)
//    String userWithTheMostChats();
//
//    @Query(value="SELECT title,\n" +
//            "       ROUND(COUNT(*) * 100 / (SELECT COUNT(*) FROM chat), 2) AS percentage\n" +
//            "FROM chat\n" +
//            "GROUP BY title\n" +
//            "ORDER BY COUNT(*) DESC\n" +
//            "LIMIT 3;",nativeQuery = true)
//    List<Object[]> findMostFrequentTitlesWithPercentage();
//
//
//    @Query(value = "SELECT c.user_name, COUNT(m.statement) AS cantidad_statements\n" +
//            "FROM chat c\n" +
//            "INNER JOIN message m ON c.id = m.chat_id\n"+
//            "WHERE m.role = 'user'\n" +
//            "GROUP BY c.user_name;", nativeQuery = true)
//    List<Object[]> numberOfMessagesPerUsers();
//
//    @Query(value = "select count(id) from chat" ,nativeQuery = true)
//    String numberOfChats();
//
//    @Query(value ="SELECT \n" +
//            "    AVG(response_time) as AvgResponseTime\n" +
//            "FROM (\n" +
//            "    SELECT \n" +
//            "        m1.unix_time as question_time, \n" +
//            "        m2.unix_time as answer_time,\n" +
//            "        (m2.unix_time - m1.unix_time) as response_time\n" +
//            "    FROM \n" +
//            "        message m1\n" +
//            "    JOIN \n" +
//            "        message m2 ON m1.id = m2.id - 1 AND m1.chat_id = m2.chat_id\n" +
//            "    WHERE \n" +
//            "        m1.role = 'user' AND \n" +
//            "        m2.role = 'bot'\n" +
//            ") as response_times;", nativeQuery = true)
//    String averageResponseTime();
//
//
//    @Query(value = "SELECT MAX(unix_time) - MIN(unix_time) as duration FROM message GROUP BY chat_id ORDER BY duration DESC LIMIT 1;\n",nativeQuery = true)
//    String longerTalkTime();


    @Query("SELECT new com.example.ucvbot.dto.ChatSummaryDTO(c.id, c.title, c.student.userUID) " +
            "FROM Chat c WHERE c.student.userUID = :userUID")
    List<ChatSummaryDTO> findChatSummariesByUserUID(@Param("userUID") String userUID);

    @Query(value = "SELECT s.user_name " +
            "FROM chat c " +
            "JOIN student s ON c.student_id = s.userUID " +
            "GROUP BY s.user_name, s.userUID " +
            "ORDER BY COUNT(*) DESC " +
            "LIMIT 1", nativeQuery = true)
    String userWithTheMostChats();

    @Query(value = "SELECT c.title, " +
            "       ROUND(COUNT(*) * 100 / (SELECT COUNT(*) FROM chat), 2) AS percentage " +
            "FROM chat c " +
            "GROUP BY c.title " +
            "ORDER BY COUNT(*) DESC " +
            "LIMIT 3", nativeQuery = true)
    List<Object[]> findMostFrequentTitlesWithPercentage();

    @Query(value = "SELECT s.user_name, COUNT(m.statement) AS cantidad_statements " +
            "FROM chat c " +
            "JOIN student s ON c.student_id = s.userUID " +
            "JOIN message m ON c.id = m.chat_id " +
            "WHERE m.role = 'user' " +
            "GROUP BY s.user_name", nativeQuery = true)
    List<Object[]> numberOfMessagesPerUsers();

    @Query(value = "SELECT COUNT(id) FROM chat", nativeQuery = true)
    String numberOfChats();

    @Query(value = "SELECT AVG(response_time) AS AvgResponseTime " +
            "FROM ( " +
            "    SELECT m1.unix_time AS question_time, " +
            "           m2.unix_time AS answer_time, " +
            "           (m2.unix_time - m1.unix_time) AS response_time " +
            "    FROM message m1 " +
            "    JOIN message m2 ON m1.id = m2.id - 1 AND m1.chat_id = m2.chat_id " +
            "    WHERE m1.role = 'user' AND m2.role = 'bot' " +
            ") AS response_times", nativeQuery = true)
    String averageResponseTime();

    @Query(value = "SELECT MAX(unix_time) - MIN(unix_time) AS duration " +
            "FROM message " +
            "GROUP BY chat_id " +
            "ORDER BY duration DESC " +
            "LIMIT 1", nativeQuery = true)
    String longerTalkTime();
}
