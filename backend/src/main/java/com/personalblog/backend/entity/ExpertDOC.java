package com.personalblog.backend.entity;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@ApiModel(description = "索引库实体")
@NoArgsConstructor
@AllArgsConstructor
public class ExpertDOC {

    @ApiModelProperty("专家id")
    private String id;
    @ApiModelProperty("专家名称")
    private String name;
    @ApiModelProperty("专家描述")
    private String intro;
    @ApiModelProperty("专家价格")
    private String price;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getIntro() {
        return intro;
    }
    public void setIntro(String intro) {
        this.intro = intro;
    }
    public String getPrice() {
        return price;
    }
    public void setPrice(String price) {
        this.price = price;
    }

}