import { registerBlockType } from "@wordpress/blocks";
import {
  useBlockProps,
  InspectorControls,
  RichText,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { PanelBody, QueryControls, ToggleControl } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { Spinner } from "@wordpress/components";
import { useEntityProp } from "@wordpress/core-data";

import { RawHTML, useEffect } from "@wordpress/element";
import icons from ".././icons.js";
import { apiFetch } from "@wordpress/api-fetch";

import "./main.css";

registerBlockType("tbones-p/post-list", {
  icon: {
    src: icons.primary,
  },
  edit({ attributes, setAttributes }) {
    const { title, count, tags, hidetitle } = attributes;
    const blockProps = useBlockProps({
      className: "ta-sidebar-blog-widget",
    });

    // console.log(count, cuisines);

    const terms = useSelect((select) => {
      return select("core").getEntityRecords("taxonomy", "post_tag", {
        per_page: -1,
      });
    });
    const suggestions = {};

    // console.log(terms);

    terms?.forEach((term) => {
      suggestions[term.name] = term;
    });

    const tagIDs = tags.map((term) => term.id);

    // console.log(tagIDs);

    const posts = useSelect(
      (select) => {
        return select("core").getEntityRecords("postType", "post", {
          per_page: count,
          _embed: true,
          tags: tagIDs,
          order: "desc",
          orderByRating: 1,
        });
      },
      [count, tagIDs]
    );

    console.log(posts);

    //  Using apiFetch

    // let postTags = [];
    // let loopPostId;

    // updatePostTags = useEffect(async () => {
    //   let response = await wp.apiFetch({
    //     path:
    //       "tbones/v1/tags/?" +
    //       new URLSearchParams({
    //         postid: loopPostId,
    //       }),
    //     method: "GET",
    //   });
    //   postTags.splice(loopPostId, 0, response);
    //   // console.log(postTags);
    // }, [loopPostId]);

    // posts?.map((post) => {
    //   // console.log(post.id);
    //   loopPostId = post.id;
    //   updatePostTags;
    // });

    // useEffect(async () => {
    //   const response = await wp.apiFetch({
    //     path: "/wp/v2/taxonomies/cuisine",
    //     method: "GET",
    //   });
    //   console.log(response);
    // }, []);

    // =============================================================

    // let { postCuisines, isLoading } = useSelect((select) => {
    //   let { getEntityRecords, isResolving } = select("core");

    //   let taxonomyArgs = [
    //     "taxonomy",
    //     "cuisine",
    //     {
    //       post: 407,
    //     },
    //   ];

    //   return {
    //     postCuisines: getEntityRecords(...taxonomyArgs),
    //     isLoading: isResolving("getEntityRecords", taxonomyArgs),
    //   };
    // }, []);

    // console.log(postCuisines, isLoading);

    // =============================================================

    // let postsWithCusineArr = [];

    // posts?.map((post) => {
    // console.log(post.id);
    // let [postTermIDs] = useEntityProp(
    //   "postType",
    //   "recipe",
    //   "cuisine",
    //   post.id
    // );
    // let { postCuisines, isLoading } = useSelect((select) => {
    //   console.log("A");
    //   let { getEntityRecords, isResolving } = select("core");
    //   console.log("B");
    //   let postTaxonomyArgs = [
    //     "taxonomy",
    //     "cuisine",
    //     {
    //       post: 407,
    //     },
    //   ];
    //   console.log("C");
    //   postCuisines = getEntityRecords(...postTaxonomyArgs);
    //   console.log("D");
    //   isLoading = isResolving("getEntityRecords", postTaxonomyArgs);
    //   console.log("E");
    //   return {
    //     postCuisines,
    //     isLoading,
    //   };
    // });
    // console.log(postCuisines, isLoading);
    // console.log(postTermIDs);
    // });

    // posts?.map((post) => {
    //   console.log(post);
    //   console.log("0");

    //   () => {
    //     console.log("1");
    //   };

    //   let {
    //     postCuisines,
    //     isLoading,
    //   } = () => {
    //     console.log("1");

    //     // let { getEntityRecords, isResolving } = select("core");
    //     // console.log("2");
    //     // let taxonomyArgs = [
    //     //   "taxonomy",
    //     //   "cuisine",
    //     //   {
    //     //     post: 407,
    //     //   },
    //     // ];
    //     // console.log("3");
    //     // postCuisines = getEntityRecords(...taxonomyArgs);
    //     // console.log("4");
    //     // isLoading = isResolving("getEntityRecords", taxonomyArgs);
    //     // console.log("5");
    //     // return {
    //     //   postCuisines,
    //     //   isLoading,
    //     // };
    //   };

    //   console.log(postCuisines, isLoading);

    //   //   postsWithCusineArr.splice(post.id, 0, postCuisines);
    // });

    //=========================================================

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Settings", "tbones-p")}>
            <ToggleControl
              label="Hide Title"
              help={hidetitle ? "Hiding Title" : "Showing Title"}
              checked={hidetitle}
              onChange={(state) => {
                setAttributes({ hidetitle: state });
              }}
            />
            <QueryControls
              label="Tags"
              numberOfItems={count}
              minItems={1}
              maxItems={10}
              onNumberOfItemsChange={(count) => setAttributes({ count })}
              categorySuggestions={suggestions}
              onCategoryChange={(newTerms) => {
                const newTags = [];

                newTerms.forEach((tag) => {
                  if (typeof tag === "object") {
                    return newTags.push(tag);
                  }

                  const tagTerm = terms?.find((term) => term.name === tag);

                  if (tagTerm) newTags.push(tagTerm);
                });

                setAttributes({ tags: newTags });
              }}
              selectedCategories={tags}
            />
          </PanelBody>
        </InspectorControls>
        <ul {...blockProps}>
          <RichText
            tagName="h6"
            value={title}
            withoutInteractiveFormatting
            onChange={(title) => setAttributes({ title })}
            placeholder={__("Title", "tbones-p")}
          />

          {posts?.map((post) => {
            // console.log(post);

            const featuredImage =
              post._embedded &&
              post._embedded["wp:featuredmedia"] &&
              post._embedded["wp:featuredmedia"].length > 0 &&
              post._embedded["wp:featuredmedia"][0];

            //Formatting the date

            let postCreationDate = post.date.substr(0, 10);

            var dateVar = new Date(postCreationDate);

            var month = new Array();
            month[0] = "Jan";
            month[1] = "Feb";
            month[2] = "Mar";
            month[3] = "Apr";
            month[4] = "May";
            month[5] = "Jun";
            month[6] = "Jul";
            month[7] = "Aug";
            month[8] = "Sept";
            month[9] = "Oct";
            month[10] = "Nov";
            month[11] = "Dec";

            var day = dateVar.getDate();

            postCreationDate =
              month[dateVar.getMonth()] +
              " " +
              day +
              ", " +
              dateVar.getFullYear();

            // console.log(post.cuisine);

            // Get post tags

            // let postCuisiness;

            // postCuisiness = useSelect((select) => {
            //   let { getEntityRecords, isResolving } = select("core");

            //   let taxonomyArgs = [
            //     "taxonomy",
            //     "cuisine",
            //     {
            //       post: 367,
            //     },
            //   ];

            //   return getEntityRecords(...taxonomyArgs);
            // });

            // console.log(postCuisiness);

            return (
              <>
                <li class="ta-sidebar-blog-widget__blog-item">
                  <ul class="ta-category-listing">
                    <li>
                      {/* {isLoading && <Spinner />}
                      {!isLoading &&
                        cuisines &&
                        cuisines.map((item, index) => {
                          const comma = cuisines[index + 1] ? "," : "";

                          return (
                            <>
                              <a
                                href={item.meta.more_info_url}
                                className="ta-tags"
                              >
                                {item.name}
                              </a>
                              {comma}
                            </>
                          );
                        })} */}
                    </li>
                  </ul>
                  <div class="ta-post-title">
                    <a href={post.link}>
                      <RawHTML>{post.title.rendered}</RawHTML>
                    </a>
                  </div>
                  <div class="ta-author-data flex flex-row space-x-3 justify-start">
                    <div class="ta-name-initials">
                      <a href="#">TA</a>
                    </div>
                    <div class="basis-[100%]">
                      <div class="font-bold ta-author">
                        <a href="#">{post._embedded.author[0].name}</a>
                      </div>
                      <p class="ta-post-date">{postCreationDate}</p>
                    </div>
                    <img
                      src="/wp-content/uploads/2022/12/bookmark_icon_black.svg"
                      class="w-4 h-4 basis-1/5"
                      alt=""
                    />
                  </div>
                </li>

                {/* <div class="ta-sidebar-blog-widget__blog-item">
                  {featuredImage && (
                    <a class="single-post-image" href={post.link}>
                      <img
                        src={
                          featuredImage.media_details.sizes.thumbnail.source_url
                        }
                        alt={featuredImage.alt_text}
                      />
                    </a>
                  )}

                  <div class="single-post-detail">
                    <a href={post.link}>
                      <RawHTML>{post.title.rendered}</RawHTML>
                    </a>
                    <span>
                      by <a href={post.link}>{post._embedded.author[0].name}</a>
                    </span>
                  </div>
                </div> */}
              </>
            );
          })}
        </ul>
      </>
    );
  },
});
