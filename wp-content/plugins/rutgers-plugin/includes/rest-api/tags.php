<?php

// Returns post tags by post ID

function tbones_rest_api_tags_handler($request)
{
    $response = [];
    $posttagsArr = [];

    $params = $request->get_params();

    // return $params;


    if (
        !isset($params["postid"]) ||
        empty($params["postid"])
    ) {
        return $response;
    }

    $postId = $params["postid"];

    $posttags = get_the_tags($postId);

    if ($posttags) {
        foreach ($posttags as $tag) {
            array_push($posttagsArr, $tag->name);
        }
    }

    return json_encode($posttagsArr);
}
