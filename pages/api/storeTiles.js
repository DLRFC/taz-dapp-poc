export default async function handler(req, res) {
  let uriStorage = [
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,
    ,/* "data:image/png;base64,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",
    "data:image/png;base64,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",
    "data:image/png;base64,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",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAAAXNSR0IArs4c6QAABgRJREFUeF7t0wEBAAAIwjDtX9oefjZgyI4jQOC9wL5PKCABAmPonoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAIHJv4A+w8ehlQAAAAASUVORK5CYII=",
    "data:image/png;base64,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",
    "data:image/png;base64,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",
    "data:image/png;base64,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",
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPoAAAD6CAYAAACI7Fo9AAAAAXNSR0IArs4c6QAABgRJREFUeF7t0wEBAAAIwjDtX9oefjZgyI4jQOC9wL5PKCABAmPonoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAKG7gcIBAQMPVCyiAQM3Q8QCAgYeqBkEQkYuh8gEBAw9EDJIhIwdD9AICBg6IGSRSRg6H6AQEDA0AMli0jA0P0AgYCAoQdKFpGAofsBAgEBQw+ULCIBQ/cDBAIChh4oWUQChu4HCAQEDD1QsogEDN0PEAgIGHqgZBEJGLofIBAQMPRAySISMHQ/QCAgYOiBkkUkYOh+gEBAwNADJYtIwND9AIGAgKEHShaRgKH7AQIBAUMPlCwiAUP3AwQCAoYeKFlEAobuBwgEBAw9ULKIBAzdDxAICBh6oGQRCRi6HyAQEDD0QMkiEjB0P0AgIGDogZJFJGDofoBAQMDQAyWLSMDQ/QCBgIChB0oWkYCh+wECAQFDD5QsIgFD9wMEAgKGHihZRAIHJv4A+w8ehlQAAAAASUVORK5CYII=",
    "data:image/png;base64,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",
   */
  ]

  if (req.method === 'GET') {
    // return the current state of the unfinished array
    res.status(200).json({ uriStorage })
  } else if (req.method === 'POST') {
    // upddate the unfinished array with latest input
    const array = req.body.uriStorage
    uriStorage = array
    res.status(201).json('post successful')
  }
}