package com.personalblog.backend.Service;

import com.alibaba.fastjson2.JSON;
import com.personalblog.backend.dao.ExpertRepository;
import com.personalblog.backend.entity.Expert;
import com.personalblog.backend.entity.ExpertDOC;
import org.bson.types.ObjectId;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.SearchHits;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ExpertService {

    @Autowired
    private ExpertRepository expertRepository;

    private RestHighLevelClient client;

    public List<ExpertDOC> getAllExperts() {
//        return expertRepository.findAll();
        List<Expert> experts = expertRepository.findAll();
        List<ExpertDOC> expertDocs = new ArrayList<>();
        for (Expert expert : experts) {
            ExpertDOC expertDOC = new ExpertDOC();
            expertDOC.setId(expert.getId().toString());
            expertDOC.setName(expert.getName());
            expertDOC.setIntro(expert.getIntro());
            expertDOC.setPrice(expert.getPrice());
            expertDocs.add(expertDOC);
        }
        return expertDocs;
    }

    public ExpertDOC getOneExpert(ObjectId id) {
//        List<Expert> experts = new ArrayList<>();
//        expertRepository.findById(id).ifPresent(experts::add);
//        return experts;
        Optional<Expert> expert = expertRepository.findById(id);
        ExpertDOC expertDOC = new ExpertDOC();
        expertDOC.setId(id.toString());
        expertDOC.setName(expert.map(Expert::getName).orElse(""));
        expertDOC.setIntro(expert.map(Expert::getIntro).orElse(""));
        expertDOC.setPrice(expert.map(Expert::getPrice).orElse(""));
        System.out.println(expertDOC.getName());
        return expertDOC;
    }

    public List<ExpertDOC> searchExperts(String keywords) {
        try{
            SearchRequest request = new SearchRequest("expert");
            if(keywords == null ||keywords.equals("")){
                request.source().query(QueryBuilders.matchAllQuery());
            }else{
                request.source().query(QueryBuilders.matchQuery("all", keywords));
            }
            SearchResponse response = client.search(request, RequestOptions.DEFAULT);
            return handleResponse(response);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private List<ExpertDOC> handleResponse(SearchResponse response) {
        SearchHits searchHits = response.getHits();
        long num = searchHits.getTotalHits().value;
        SearchHit[] hits = searchHits.getHits();
        List<ExpertDOC> experts = new ArrayList<>();
        for(SearchHit hit : hits){
            String json = hit.getSourceAsString();
            ExpertDOC expertDoc = JSON.parseObject(json, ExpertDOC.class);
            experts.add(expertDoc);
        }
        return experts;
    }

    public void addExpert(Expert expert) throws IOException {
        expertRepository.save(expert);

        // 此处可以采用消息队列来异步将数据同步到es中
//        IndexRequest request = new IndexRequest("expert").id(String.valueOf(expertRepository.findByName(expert.getName()).map(Expert::getId)));
//        request.source(JSON.toJSONString(expert), XContentType.JSON);
//        client.index(request, RequestOptions.DEFAULT);
    }
}
