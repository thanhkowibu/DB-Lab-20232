package com.huy.airbnbserver.system;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PageMetadata {
    private Long current_page;
    private Long last_page;
    private Long page_size;
    private Boolean has_next_page;

    public PageMetadata(Long current_page, Long page_size, Long total_size) {
        this.current_page = current_page;
        this.page_size = page_size;
        this.last_page = (long) Math.ceil((double) total_size / page_size);
        this.has_next_page = last_page > current_page;
    }
}
