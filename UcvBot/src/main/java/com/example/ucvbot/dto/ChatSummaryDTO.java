package com.example.ucvbot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatSummaryDTO {

    private Long v_id;

    private String v_title;

    private String v_userUID;
}
