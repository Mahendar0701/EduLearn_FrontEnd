/* eslint-disable @typescript-eslint/no-explicit-any */
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { API_ENDPOINT } from "../../config/constants";

const navigation = [
  { name: "Dashboard", href: "/dashboard", current: true },
  { name: "My Courses", href: "/dashboard/mycourses", current: false },
  // { name: "My progress", href: "#", current: false },
  { name: "Report", href: "/dashboard/report", current: false },
];

const authenticated = !!localStorage.getItem("authToken");
// const authenticated = !!localStorage.getItem("authToken");
console.log("authenticated", authenticated);

export default function Example() {
  const [categories, setCategories] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const { pathname } = useLocation();

  const fetchCategories = async () => {
    try {
      // const authToken = localStorage.getItem("authToken");
      const response = await axios.get(
        `${API_ENDPOINT}/api/categories/`
        // {
        //   headers: {
        //     Authorization: `Token ${authToken}`,
        //   },
        // }
      );
      console.log("categories", response.data);
      setCategories(response.data);
    } catch (error: any) {
      console.error(
        "Category retrieval failed:",
        error.response?.data || error.message
      );
    }
  };

  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  const changeLanguage = (language: string) => {
    // e.preventDefault();
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  function classNames(...classes: string[]): string {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                    alt={t("Your Company")}
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {t(item.name)}
                      </a>
                    ))}

                    {/* category */}
                    {/* Catalog dropdown */}
                    <div className="flex space-x-4 relative">
                      {/* Catalog dropdown */}
                      <Menu>
                        <div
                          onMouseEnter={() => {
                            fetchCategories();
                            setIsMenuOpen(true); // Open menu on hover
                          }}
                          onMouseLeave={() => setIsMenuOpen(false)} // Close menu on mouse leave
                          className="relative"
                        >
                          <Menu.Button
                            className={
                              "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none"
                            }
                          >
                            {t("Catalog")} &#11167;
                          </Menu.Button>
                          <Transition
                            show={isMenuOpen}
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <div className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {categories.map((category: any) => (
                                <a
                                  key={category.id}
                                  href={`/dashboard/catalog/${category.id}`}
                                  className={
                                    "block px-4 py-2 text-sm text-gray-700"
                                  }
                                >
                                  {category.title}
                                </a>
                              ))}
                            </div>
                          </Transition>
                        </div>
                      </Menu>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <a href="/dashboard/cart">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    // stroke-width="0"
                    viewBox="0 0 1024 1024"
                    className="text-2xl text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path>
                  </svg>
                </a>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/profile"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {t("Your Profile")}
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {t("Settings")}
                          </a>
                        )}
                      </Menu.Item>

                      {authenticated ? (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/logout"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {t("Sign out")}
                            </a>
                          )}
                        </Menu.Item>
                      ) : (
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/signin"
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {t("Sign In")}
                            </a>
                          )}
                        </Menu.Item>
                      )}
                      <Menu as="div" className="relative ml-3">
                        <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                          {currentLanguage === "en"
                            ? t("English")
                            : currentLanguage === "es"
                            ? t("Spanish")
                            : t("German")}{" "}
                          {/* Add the third language label */}
                          <svg
                            className="-mr-1 ml-2 h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </Menu.Button>

                        <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900`}
                                onClick={() => changeLanguage("en")}
                              >
                                {t("English")}
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900`}
                                onClick={() => changeLanguage("es")}
                              >
                                {t("Spanish")}
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={`${
                                  active ? "bg-gray-100" : ""
                                } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900`}
                                onClick={() => changeLanguage("gr")}
                              >
                                {t("German")}
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Menu>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {t(item.name)}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Fragment, useState } from "react";
// import { Disclosure, Menu, Transition } from "@headlessui/react";
// import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
// import axios from "axios";
// import { useTranslation } from "react-i18next";
// import { API_ENDPOINT } from "../../config/constants";

// const navigation = [
//   { name: "Dashboard", href: "/dashboard", current: true },
//   { name: "My Courses", href: "/dashboard/mycourses", current: false },
//   // { name: "My progress", href: "#", current: false },
//   { name: "Report", href: "/dashboard/report", current: false },
// ];

// const authenticated = !!localStorage.getItem("authToken");
// // const authenticated = !!localStorage.getItem("authToken");
// console.log("authenticated", authenticated);

// export default function Example() {
//   const [categories, setCategories] = useState([]);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   // const { pathname } = useLocation();

//   const fetchCategories = async () => {
//     try {
//       // const authToken = localStorage.getItem("authToken");
//       const response = await axios.get(
//         `${API_ENDPOINT}/api/categories/`
//         // {
//         //   headers: {
//         //     Authorization: `Token ${authToken}`,
//         //   },
//         // }
//       );
//       console.log("categories", response.data);
//       setCategories(response.data);
//     } catch (error: any) {
//       console.error(
//         "Category retrieval failed:",
//         error.response?.data || error.message
//       );
//     }
//   };

//   const { t, i18n } = useTranslation();
//   const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

//   const changeLanguage = (language: string) => {
//     // e.preventDefault();
//     i18n.changeLanguage(language);
//     setCurrentLanguage(language);
//   };

//   function classNames(...classes: string[]): string {
//     return classes.filter(Boolean).join(" ");
//   }

//   return (
//     <Disclosure as="nav" className="bg-gray-800">
//       {({ open }) => (
//         <>
//           <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
//             <div className="relative flex h-16 items-center justify-between">
//               <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
//                 {/* Mobile menu button*/}
//                 <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
//                   <span className="absolute -inset-0.5" />
//                   <span className="sr-only">Open main menu</span>
//                   {open ? (
//                     <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
//                   ) : (
//                     <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
//                   )}
//                 </Disclosure.Button>
//               </div>
//               <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
//                 <div className="flex flex-shrink-0 items-center">
//                   <img
//                     className="h-8 w-auto"
//                     src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
//                     alt="Your Company"
//                   />
//                 </div>
//                 <div className="hidden sm:ml-6 sm:block">
//                   <div className="flex space-x-4">
//                     {navigation.map((item) => (
//                       <a
//                         key={item.name}
//                         href={item.href}
//                         className={classNames(
//                           item.current
//                             ? "bg-gray-900 text-white"
//                             : "text-gray-300 hover:bg-gray-700 hover:text-white",
//                           "rounded-md px-3 py-2 text-sm font-medium"
//                         )}
//                         aria-current={item.current ? "page" : undefined}
//                       >
//                         {t(`${item.name}`)}
//                       </a>
//                     ))}

//                     {/* category */}
//                     {/* Catalog dropdown */}
//                     <div className="flex space-x-4 relative">
//                       {/* Catalog dropdown */}
//                       <Menu>
//                         <div
//                           onMouseEnter={() => {
//                             fetchCategories();
//                             setIsMenuOpen(true); // Open menu on hover
//                           }}
//                           onMouseLeave={() => setIsMenuOpen(false)} // Close menu on mouse leave
//                           className="relative"
//                         >
//                           <Menu.Button
//                             className={
//                               "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium focus:outline-none"
//                             }
//                           >
//                             Catalog &#11167;
//                           </Menu.Button>
//                           <Transition
//                             show={isMenuOpen}
//                             as={Fragment}
//                             enter="transition ease-out duration-100"
//                             enterFrom="transform opacity-0 scale-95"
//                             enterTo="transform opacity-100 scale-100"
//                             leave="transition ease-in duration-75"
//                             leaveFrom="transform opacity-100 scale-100"
//                             leaveTo="transform opacity-0 scale-95"
//                           >
//                             <div className="absolute z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                               {categories.map((category: any) => (
//                                 <a
//                                   key={category.id}
//                                   href={`/dashboard/catalog/${category.id}`}
//                                   className={
//                                     "block px-4 py-2 text-sm text-gray-700"
//                                   }
//                                 >
//                                   {category.title}
//                                 </a>
//                               ))}
//                             </div>
//                           </Transition>
//                         </div>
//                       </Menu>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
//                 <a href="/dashboard/cart">
//                   <svg
//                     stroke="currentColor"
//                     fill="currentColor"
//                     // stroke-width="0"
//                     viewBox="0 0 1024 1024"
//                     className="text-2xl text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
//                     height="1em"
//                     width="1em"
//                     xmlns="http://www.w3.org/2000/svg"
//                   >
//                     <path d="M922.9 701.9H327.4l29.9-60.9 496.8-.9c16.8 0 31.2-12 34.2-28.6l68.8-385.1c1.8-10.1-.9-20.5-7.5-28.4a34.99 34.99 0 0 0-26.6-12.5l-632-2.1-5.4-25.4c-3.4-16.2-18-28-34.6-28H96.5a35.3 35.3 0 1 0 0 70.6h125.9L246 312.8l58.1 281.3-74.8 122.1a34.96 34.96 0 0 0-3 36.8c6 11.9 18.1 19.4 31.5 19.4h62.8a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7h161.1a102.43 102.43 0 0 0-20.6 61.7c0 56.6 46 102.6 102.6 102.6s102.6-46 102.6-102.6c0-22.3-7.4-44-20.6-61.7H923c19.4 0 35.3-15.8 35.3-35.3a35.42 35.42 0 0 0-35.4-35.2zM305.7 253l575.8 1.9-56.4 315.8-452.3.8L305.7 253zm96.9 612.7c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6zm325.1 0c-17.4 0-31.6-14.2-31.6-31.6 0-17.4 14.2-31.6 31.6-31.6s31.6 14.2 31.6 31.6a31.6 31.6 0 0 1-31.6 31.6z"></path>
//                   </svg>
//                 </a>

//                 {/* Profile dropdown */}
//                 <Menu as="div" className="relative ml-3">
//                   <div>
//                     <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
//                       <span className="absolute -inset-1.5" />
//                       <span className="sr-only">Open user menu</span>
//                       <img
//                         className="h-8 w-8 rounded-full"
//                         src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//                         alt=""
//                       />
//                     </Menu.Button>
//                   </div>

//                   <Transition
//                     as={Fragment}
//                     enter="transition ease-out duration-100"
//                     enterFrom="transform opacity-0 scale-95"
//                     enterTo="transform opacity-100 scale-100"
//                     leave="transition ease-in duration-75"
//                     leaveFrom="transform opacity-100 scale-100"
//                     leaveTo="transform opacity-0 scale-95"
//                   >
//                     <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
//                       <Menu.Item>
//                         {({ active }) => (
//                           <a
//                             href="/profile"
//                             className={classNames(
//                               active ? "bg-gray-100" : "",
//                               "block px-4 py-2 text-sm text-gray-700"
//                             )}
//                           >
//                             Your Profile
//                           </a>
//                         )}
//                       </Menu.Item>
//                       <Menu.Item>
//                         {({ active }) => (
//                           <a
//                             href="#"
//                             className={classNames(
//                               active ? "bg-gray-100" : "",
//                               "block px-4 py-2 text-sm text-gray-700"
//                             )}
//                           >
//                             Settings
//                           </a>
//                         )}
//                       </Menu.Item>

//                       {authenticated ? (
//                         <Menu.Item>
//                           {({ active }) => (
//                             <a
//                               href="/logout"
//                               className={classNames(
//                                 active ? "bg-gray-100" : "",
//                                 "block px-4 py-2 text-sm text-gray-700"
//                               )}
//                             >
//                               Sign out
//                             </a>
//                           )}
//                         </Menu.Item>
//                       ) : (
//                         <Menu.Item>
//                           {({ active }) => (
//                             <a
//                               href="/signin"
//                               className={classNames(
//                                 active ? "bg-gray-100" : "",
//                                 "block px-4 py-2 text-sm text-gray-700"
//                               )}
//                             >
//                               Sign In
//                             </a>
//                           )}
//                         </Menu.Item>
//                       )}
//                       <Menu as="div" className="relative ml-3">
//                         <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
//                           {currentLanguage === "en"
//                             ? "English"
//                             : currentLanguage === "es"
//                             ? "Spanish"
//                             : "German"}{" "}
//                           {/* Add the third language label */}
//                           <svg
//                             className="-mr-1 ml-2 h-5 w-5"
//                             xmlns="http://www.w3.org/2000/svg"
//                             viewBox="0 0 20 20"
//                             fill="currentColor"
//                             aria-hidden="true"
//                           >
//                             <path
//                               fillRule="evenodd"
//                               d="M10 12a1 1 0 01-.707-.293l-4-4a1 1 0 111.414-1.414L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4A1 1 0 0110 12z"
//                               clipRule="evenodd"
//                             />
//                           </svg>
//                         </Menu.Button>

//                         <Menu.Items className="absolute right-0 z-10 w-40 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 className={`${
//                                   active ? "bg-gray-100" : ""
//                                 } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900`}
//                                 onClick={() => changeLanguage("en")}
//                               >
//                                 English
//                               </button>
//                             )}
//                           </Menu.Item>
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 className={`${
//                                   active ? "bg-gray-100" : ""
//                                 } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900`}
//                                 onClick={() => changeLanguage("es")}
//                               >
//                                 Spanish
//                               </button>
//                             )}
//                           </Menu.Item>
//                           <Menu.Item>
//                             {({ active }) => (
//                               <button
//                                 className={`${
//                                   active ? "bg-gray-100" : ""
//                                 } group flex rounded-md items-center w-full px-2 py-2 text-sm text-gray-900`}
//                                 onClick={() => changeLanguage("gr")}
//                               >
//                                 German
//                               </button>
//                             )}
//                           </Menu.Item>
//                         </Menu.Items>
//                       </Menu>
//                     </Menu.Items>
//                   </Transition>
//                 </Menu>
//               </div>
//             </div>
//           </div>

//           <Disclosure.Panel className="sm:hidden">
//             <div className="space-y-1 px-2 pb-3 pt-2">
//               {navigation.map((item) => (
//                 <Disclosure.Button
//                   key={item.name}
//                   as="a"
//                   href={item.href}
//                   className={classNames(
//                     item.current
//                       ? "bg-gray-900 text-white"
//                       : "text-gray-300 hover:bg-gray-700 hover:text-white",
//                     "block rounded-md px-3 py-2 text-base font-medium"
//                   )}
//                   aria-current={item.current ? "page" : undefined}
//                 >
//                   {item.name}
//                 </Disclosure.Button>
//               ))}
//             </div>
//           </Disclosure.Panel>
//         </>
//       )}
//     </Disclosure>
//   );
// }
