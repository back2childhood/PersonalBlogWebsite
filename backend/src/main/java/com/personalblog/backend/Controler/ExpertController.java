package com.personalblog.backend.Controler;

import com.personalblog.backend.Service.ExpertService;
import com.personalblog.backend.entity.Expert;
import com.personalblog.backend.entity.ExpertDOC;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"},allowCredentials = "true", methods={RequestMethod.GET,RequestMethod.POST,RequestMethod.HEAD})
public class ExpertController {

    @Autowired
    private ExpertService expertService;

    @GetMapping("/experts")
    public ResponseEntity<List<ExpertDOC>> getAllExperts() {
        return new ResponseEntity<>(expertService.getAllExperts(), HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getOneExpert(@PathVariable("id") String id) {
//        System.out.println(credentials.get("id"));
        return ResponseEntity.ok(expertService.getOneExpert(new ObjectId(id)));
    }

    @GetMapping("/search")
    public ResponseEntity<List<ExpertDOC>> getExpertsByKeywords(@RequestBody String keywords) {
        List<ExpertDOC> searchResult =
                expertService.searchExperts(keywords);
        return ResponseEntity.ok(searchResult);
    }

    @PostMapping(path = "/add")
    @ResponseBody
    public ResponseEntity<?> addDiscussPost(@RequestBody Map<String, String> credentials) throws IOException {
        Expert expert = new Expert();
        expert.setName(credentials.get("name"));
        expert.setIntro(credentials.get("intro"));
        expert.setPrice(credentials.get("price"));

        expertService.addExpert(expert);

        return ResponseEntity.ok("添加成功");

        // 报错的情况,将来统一处理.
    }
}
