package com.huy.airbnbserver.system.common;

import lombok.Getter;

@Getter
public class Page {
    private final long page;
    private final long pageSize;
    private final long limit;
    private final long offset;

    public Page(Long page, Long pageSize) {
        this.page = page == null ? 1 : page;
        this.pageSize = pageSize == null ? 24 : pageSize;
        this.limit = this.pageSize;
        this.offset = (this.page - 1) * this.limit;
    }
}
