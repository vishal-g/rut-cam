import { registerBlockType } from "@wordpress/blocks";
import {
  useBlockProps,
  InspectorControls,
  RichText,
} from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { PanelBody, QueryControls } from "@wordpress/components";
import { useSelect } from "@wordpress/data";
import { Spinner } from "@wordpress/components";
import { RawHTML } from "@wordpress/element";
import icons from ".././icons.js";
import { apiFetch } from "@wordpress/api-fetch";

import "./main.css";

registerBlockType("tbones-p/popular-recipes", {
  icon: {
    src: icons.primary,
  },
  edit({ attributes, setAttributes }) {
    const { title, count, cuisines } = attributes;
    const blockProps = useBlockProps({
      className: "ta-sidebar-blog-widget",
    });

    // console.log(postCuisines, isLoading);

    const terms = useSelect((select) => {
      return select("core").getEntityRecords("taxonomy", "cuisine", {
        per_page: -1,
      });
    });
    const suggestions = {};

    terms?.forEach((term) => {
      suggestions[term.name] = term;
    });

    const cuisineIDs = cuisines.map((term) => term.id);
    const posts = useSelect(
      (select) => {
        return select("core").getEntityRecords("postType", "recipe", {
          per_page: count,
          _embed: true,
          cuisine: cuisineIDs,
          order: "desc",
          orderByRating: 1,
        });
      },
      [count, cuisineIDs]
    );

    // =============================================================

    // let { postCuisines, isLoading } = useSelect((select) => {
    //   let { getEntityRecords, isResolving } = select("core");

    //   let taxonomyArgs = [
    //     "taxonomy",
    //     "cuisine",
    //     {
    //       post: 367,
    //     },
    //   ];

    //   return {
    //     postCuisines: getEntityRecords(...taxonomyArgs),
    //     isLoading: isResolving("getEntityRecords", taxonomyArgs),
    //   };
    // }, []);

    // console.log(postCuisines);

    // =============================================================

    const postsWithCusineArr = [];

    posts?.map((post) => {
      let postCuisines;

      console.log(post);

      postCuisines = useSelect((select) => {
        let { getEntityRecords, isResolving } = select("core");

        let taxonomyArgs = [
          "taxonomy",
          "cuisine",
          {
            post: 367,
          },
        ];

        return getEntityRecords(...taxonomyArgs);
      });

      postsWithCusineArr.splice(post.id, 0, postCuisines);
    });

    //=========================================================

    return (
      <>
        <InspectorControls>
          <PanelBody title={__("Settings", "tbones-p")}>
            <QueryControls
              numberOfItems={count}
              minItems={1}
              maxItems={10}
              onNumberOfItemsChange={(count) => setAttributes({ count })}
              categorySuggestions={suggestions}
              onCategoryChange={(newTerms) => {
                const newCuisines = [];

                newTerms.forEach((cuisine) => {
                  if (typeof cuisine === "object") {
                    return newCuisines.push(cuisine);
                  }

                  const cuisineTerm = terms?.find(
                    (term) => term.name === cuisine
                  );

                  if (cuisineTerm) newCuisines.push(cuisineTerm);
                });

                setAttributes({ cuisines: newCuisines });
              }}
              selectedCategories={cuisines}
            />
          </PanelBody>
        </InspectorControls>
        <ul {...blockProps}>
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
